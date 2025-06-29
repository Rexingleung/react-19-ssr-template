import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';

// 使用一个更简单的组件结构，减少出错可能
const App = () => {
  console.log('App组件渲染');
  
  // React 19中可以使用以下方式解决水合问题
  const isServer = typeof window === 'undefined';
  console.log('App 是否服务端:', isServer);
  
  return (
    <div>
      <nav>
        <Link to="/">home</Link> | <Link to="/about">about</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;