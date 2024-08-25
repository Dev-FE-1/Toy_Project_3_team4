import { StrictMode } from 'react';

import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';

import GlobalStyles from '@/styles/GlobalStyles';
import theme from '@/styles/Theme.ts';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
