import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('chat') as HTMLElement);

root.render(
  <App />,
);
