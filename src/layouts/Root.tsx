import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar/Navbar';
import theme from '@/styles/theme';

const RootLayout = () => (
  <div css={wrapperStyle}>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

const wrapperStyle = css`
  max-width: ${theme.width.max};
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${theme.colors.white};

  @media screen and (min-width: ${theme.width.max}) {
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
  }

  main {
    padding: 16px;
  }
`;

export default RootLayout;
