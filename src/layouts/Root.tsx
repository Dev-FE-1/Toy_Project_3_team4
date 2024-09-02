import { css } from '@emotion/react';

import Navbar from '@/components/layout/navbar/Navbar';
import ContainerLayout from '@/layouts/Container';

const RootLayout = () => (
  <>
    <header id="header"></header>
    <Navbar />
    <ContainerLayout customStyle={mainStyle} />
  </>
);

const mainStyle = css`
  padding-bottom: 86px;
`;

export default RootLayout;
