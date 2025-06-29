import React from 'react'
import express from 'express';
import App from './App'
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import fs from 'fs';
import path from 'path';

// 通过 manifest 文件，找到正确的产物路径
const clientManifest = require("../dist/manifest-client.json");
// 读取调试脚本
const server = express();
function render(req, res, next) {
  const skip = [
    /\.js$/, /\.css$/, /\.ico$/, /\.png$/, /\.svg$/,
    /^\/favicon\.ico$/, /^\/.well-known\//
  ].some((r) => r.test(req.url));
  if (skip) return next();
  console.log('服务端渲染路径:', req.url);
  const clientCss = clientManifest["client.css"];
  const clientBundle = clientManifest["client.js"];
  let didError = false;
  const { pipe, abort } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      onShellReady() {
        console.log('onShellReady 触发');
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-Type', 'text/html');

        // 简化HTML结构，减少不匹配的可能性
        res.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>demo</title>
  <link rel="stylesheet" href="${clientCss}">
</head>
<body>
  <div id="app">`);
        
        pipe(res);
      },
      onAllReady() {
        console.log('onAllReady 触发');
        res.write(`</div>
      <script src="${clientBundle}"></script>
</body>
</html>`);
        res.end();
      },
      onError(err) {
        didError = true;
        console.error('服务端渲染错误:', err);
      }
    }
  );
  setTimeout(() => abort(), 10000);
}
// 监听根路由, 为了解决根路由在刷新时出现[客户端和服务端渲染不一致的问题]
server.get("/", async (req, res, next) => {
  render(req, res, next);
});
// 通过通配符匹配所有路由
server.get("/*path", async (req, res, next) => {
  render(req, res, next);
});

server.use(express.static("./dist"));


server.listen(3000, () => {
  console.log('SSR服务器已启动: http://localhost:3000');
});