import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).then(async () => {
      const registration = await navigator.serviceWorker.ready;
      registration.active?.postMessage({
        type: "CACHE_URLS",
        urls: collectShellUrls()
      });
    });
  });
}

function collectShellUrls(): string[] {
  const baseUrl = new URL(import.meta.env.BASE_URL, location.origin);
  const basePath = baseUrl.pathname.endsWith("/") ? baseUrl.pathname : `${baseUrl.pathname}/`;
  const urls = new Set([basePath, `${basePath}index.html`, `${basePath}manifest.json`, `${basePath}icons/icon.svg`]);
  document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>("script[src], link[href]").forEach((element) => {
    const attr = element instanceof HTMLScriptElement ? element.src : element.href;
    if (attr && new URL(attr).origin === location.origin) {
      urls.add(new URL(attr).pathname);
    }
  });
  return [...urls];
}
