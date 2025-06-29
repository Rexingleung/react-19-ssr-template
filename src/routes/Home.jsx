import React, { useEffect } from 'react';

export default function Home() {
  console.log('Home 是否服务端:', typeof window === 'undefined');
  useEffect(() => {
    console.log('Home 组件渲染');
  }, []);
  return <h1>home page</h1>;
}