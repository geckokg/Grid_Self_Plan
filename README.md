# 电网通信备考助手

这是一个离线优先的静态 PWA，用于通信类备考、错题复习、笔记整理和岗位投递记录。

## 本地开发

```powershell
npm install
npm run dev
```

本地临时预览：

```powershell
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

局域网预览只适合临时调试。手机和电脑不在同一网络、电脑或手机开 VPN、Wi-Fi 开启客户端隔离时，手机可能打不开电脑上的 `http://电脑IP:4173`。

## 不想要求手机和电脑在同一网络

推荐把手机端 PWA 当成真正的静态网站部署到公网 HTTPS：

1. 运行 `npm run build`。
2. 把 `dist` 部署到 Cloudflare Pages、GitHub Pages、Vercel、Netlify 等静态托管。
3. iPhone Safari 打开 HTTPS 地址，添加到主屏幕。
4. 第一次联网打开并缓存后，之后无网络也能打开和刷题。

这样 App 本体不依赖你的电脑，也不要求手机和电脑连同一个 Wi-Fi。

### Cloudflare Pages 网页上传

当前已生成可上传包：

```text
D:\WK\Grid_Self_Plan\grid-self-plan-dist.zip
```

网页操作：

1. 打开 Cloudflare Dashboard。
2. 进入 Workers & Pages。
3. Create application。
4. Pages。
5. Upload assets。
6. 项目名可填 `grid-self-plan`。
7. 上传 `grid-self-plan-dist.zip`，或上传 `dist` 文件夹里的全部内容。
8. 部署完成后，用 Cloudflare 给出的 `https://*.pages.dev` 地址在 iPhone Safari 打开并添加到主屏幕。

这个长期静态地址只负责打开 App 和离线刷题。电脑同步服务后续仍可以用临时 Tunnel、Tailscale，或再单独部署一个 HTTPS API。

## 临时跨网络预览

如果只是想先让手机在不同局域网下访问，可以用 Cloudflare Tunnel 临时暴露本机静态预览：

```powershell
npm run public-preview
```

脚本会：

- 构建 `dist`
- 用 `serve` 在本机 `4173` 端口托管静态文件
- 启动 `cloudflared` 临时隧道
- 打印一个 `https://...trycloudflare.com` 地址

这个临时地址需要电脑保持开机和脚本对应进程保持运行。它适合调试和首次下载安装到手机；长期使用还是建议部署到 Cloudflare Pages、GitHub Pages、Vercel、Netlify 这类静态托管。

## 电脑同步服务怎么处理

静态 PWA 可以独立运行；电脑服务只在需要导入题库、备份记录、同步笔记时使用。

如果你也不想同步时同网访问电脑服务，有三种方向：

- Cloudflare Tunnel：电脑服务开在本机，再用 Tunnel 暴露一个 HTTPS 地址，手机设置里填这个地址。
- Tailscale：手机和电脑加入同一个虚拟私有网络，设置里填电脑的 Tailscale 地址。
- 云端后端：以后把同步服务放到云服务器或轻量数据库，电脑端只作为导入工具。

如果 PWA 部署在 HTTPS，电脑同步 API 也最好使用 HTTPS 地址；否则浏览器可能因为混合内容拦截 HTTP API。

## 当前题库方向

第一版内置的是原创通信类示例题，只用于验证功能：

- 通信原理
- 信号与系统
- 光纤通信
- 移动通信
- 计算机网络
- 电力通信网
- 行测/公共基础/企业文化

正式题库应由你自己有权使用的资料导入，前端不会内置侵权题库。
