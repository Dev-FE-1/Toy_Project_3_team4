import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import Toast from '@/components/common/Toast';
import GlobalStyles from '@/styles/GlobalStyles';
import theme from '@/styles/theme.ts';

import Overlay from './components/common/modals/Overlay';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <App />
      <Toast />
      <Overlay />
    </QueryClientProvider>
  </ThemeProvider>,
);
