import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// 添加调试信息，帮助追踪水合错误
console.log('客户端渲染开始');

// 获取初始URL
const initialUrl = window.__INITIAL_URL__ || '/';
console.log('初始URL:', initialUrl);

// 获取容器
const container = document.getElementById('app');

// 使用hydrateRoot进行客户端激活
try {
  hydrateRoot(
    container,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  console.log('客户端水合完成');
} catch (error) {
  console.error('客户端水合错误:', error);
}