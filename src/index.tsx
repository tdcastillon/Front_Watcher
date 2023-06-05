import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from './App_Router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);