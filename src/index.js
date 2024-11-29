import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileProvider } from './context/ProfileContext'; // Import ProfileProvider
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

ReactDOM.render(
  <React.StrictMode>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
