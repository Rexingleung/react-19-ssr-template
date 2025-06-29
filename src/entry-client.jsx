import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('app');
hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);