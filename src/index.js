import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './input.css';
import { AuthProvider } from './AuthContext';
import helmet from 'helmet'; // Import the helmet library

const csp = helmet.contentSecurityPolicy({
  directives: {
    connectSrc: [
      "'self'",
      'https://api.stripe.com',
      'https://errors.stripe.com',
      'https://r.stripe.com',
      'https://ppm.stripe.com',
      'https://merchant-ui-api.stripe.com', // Add this line
    ],
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Apply the CSP middleware
csp.apply();




