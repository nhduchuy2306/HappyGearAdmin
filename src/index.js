import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotificationProvider } from './components/Context/NotificationProvider';
import { SearchProvider } from './components/Context/SearchProvider';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './components/Context/LoginProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <NotificationProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </NotificationProvider>
    </LoginProvider>
  </React.StrictMode>
);