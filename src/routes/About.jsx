import React, { useEffect, useState } from 'react';

export default function About() {
  const [count, setCount] = useState(0);
  console.log('About 是否服务端:', typeof window === 'undefined');
  useEffect(() => {
    console.log('About 组件渲染');
    setCount(2)
  }, []);
  return <>
  <h1>about page</h1>
  <button onClick={() => setCount(count + 1)}>count: {count}</button>
  </>;
}