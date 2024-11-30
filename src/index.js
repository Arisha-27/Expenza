import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileProvider } from './context/ProfileContext'; // Import ProfileProvider
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.render(
  <React.StrictMode>
    <ProfileProvider>
      <ThemeProvider>
        <Router> {/* Wrap your app with BrowserRouter */}
          <App />
        </Router>
      </ThemeProvider>
    </ProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
