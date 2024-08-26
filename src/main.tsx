import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import Toast from '@/components/common/Toast.tsx';
import GlobalStyles from '@/styles/GlobalStyles';
import theme from '@/styles/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
      <Toast />
    </ThemeProvider>
  </StrictMode>,
);
