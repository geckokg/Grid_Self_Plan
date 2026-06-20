Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$logDir = Join-Path $root "tmp"
$serverOut = Join-Path $logDir "local-api-server.out.log"
$serverErr = Join-Path $logDir "local-api-server.err.log"
$tunnelOut = Join-Path $logDir "cloudflared.out.log"
$tunnelErr = Join-Path $logDir "cloudflared.err.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function New-UploadToken {
  $bytes = New-Object byte[] 18
  [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
  return [Convert]::ToBase64String($bytes).TrimEnd("=").Replace("+", "-").Replace("/", "_")
}

Write-Host "Building PWA..."
Push-Location $root
try {
  npm.cmd run build

  $existing = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue
  foreach ($connection in $existing) {
    Stop-Process -Id $connection.OwningProcess -Force -ErrorAction SilentlyContinue
  }

  Remove-Item -LiteralPath $serverOut, $serverErr, $tunnelOut, $tunnelErr -ErrorAction SilentlyContinue

  $oldUploadToken = $env:UPLOAD_TOKEN
  $generatedUploadToken = $false
  if ([string]::IsNullOrWhiteSpace($env:UPLOAD_TOKEN)) {
    $env:UPLOAD_TOKEN = New-UploadToken
    $generatedUploadToken = $true
  }
  $uploadToken = $env:UPLOAD_TOKEN

  $node = (Get-Command node.exe).Source
  try {
    Start-Process -FilePath $node `
      -ArgumentList @("scripts/local-api-server.mjs") `
      -WorkingDirectory $root `
      -WindowStyle Hidden `
      -RedirectStandardOutput $serverOut `
      -RedirectStandardError $serverErr | Out-Null
  } finally {
    if ($generatedUploadToken) {
      if ($null -eq $oldUploadToken) {
        Remove-Item Env:\UPLOAD_TOKEN -ErrorAction SilentlyContinue
      } else {
        $env:UPLOAD_TOKEN = $oldUploadToken
      }
    }
  }

  Start-Sleep -Seconds 4

  $cloudflared = Get-Command cloudflared.exe -ErrorAction SilentlyContinue
  if (-not $cloudflared) {
    $fallback = "C:\Program Files (x86)\cloudflared\cloudflared.exe"
    if (Test-Path $fallback) {
      $cloudflaredPath = $fallback
    } else {
      throw "cloudflared.exe was not found. Install it with: winget install --id Cloudflare.cloudflared --exact"
    }
  } else {
    $cloudflaredPath = $cloudflared.Source
  }

  Start-Process -FilePath $cloudflaredPath `
    -ArgumentList @("tunnel", "--no-autoupdate", "--url", "http://127.0.0.1:4173") `
    -WorkingDirectory $root `
    -WindowStyle Hidden `
    -RedirectStandardOutput $tunnelOut `
    -RedirectStandardError $tunnelErr | Out-Null

  $url = $null
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    $text = ""
    if (Test-Path $tunnelOut) { $text += Get-Content -Path $tunnelOut -Raw -ErrorAction SilentlyContinue }
    if (Test-Path $tunnelErr) { $text += Get-Content -Path $tunnelErr -Raw -ErrorAction SilentlyContinue }

    $match = [regex]::Match($text, "https://[a-zA-Z0-9-]+\.trycloudflare\.com")
    if ($match.Success) {
      $url = $match.Value
      break
    }
  }

  if (-not $url) {
    throw "Tunnel started, but no public URL was found. Check tmp/cloudflared.err.log."
  }

  Write-Host ""
  Write-Host "Public HTTPS URL:"
  Write-Host $url
  Write-Host ""
  Write-Host "Phone upload URL:"
  Write-Host "$url/upload?token=$uploadToken"
  Write-Host ""
  Write-Host "Upload token:"
  Write-Host $uploadToken
  Write-Host ""
  Write-Host "Keep this computer awake while using the temporary tunnel."
} finally {
  Pop-Location
}
