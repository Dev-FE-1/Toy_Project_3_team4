import * as path from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@src': path.resolve(__dirname, './src'),
  //     '@assets': path.resolve(__dirname, './src/assets'),
  //     '@components': path.resolve(__dirname, './src/components'),
  //     '@server': path.resolve(__dirname, './server'),
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'], // 여기서 babel-plugin 추가
      },
    }),
    tsconfigPaths(),
    visualizer(),
  ],
});
