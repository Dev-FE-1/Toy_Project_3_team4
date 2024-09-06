import { css, keyframes } from '@emotion/react';

import logo from '@/assets/images/logo.svg';
import { mainStyle } from '@/layouts/Container';

const Loading = () => {
  return (
    <main css={[mainStyle, containerStyle]}>
      <img src={logo} alt="플리 로고" />
    </main>
  );
};

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  img {
    width: 70px;
    height: 70px;
    margin-top: 30%;
    animation: ${float} 2s ease-in-out infinite;
  }
`;

export default Loading;
