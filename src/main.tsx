import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app1.tsx';
import { AuthProvider } from './context/auth-context';
import { ThemeProvider } from './context/theme-context';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);