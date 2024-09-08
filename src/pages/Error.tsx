import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import FullButton from '@/components/common/buttons/FullButton';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>페이지가 존재하지 않아요</h1>
      <div css={messageContainerStyle}>
        <p css={messageStyle}>
          이 화면은 존재하지 않거나 접근할 수 없는 경로에 접근하는 경우에 표시됩니다.
        </p>
        <p css={messageStyle}>
          정확한 경로에 접근하셨는지, 로그인 상태인지, 비정상적인 접근을 한 것은 아닌지 확인해보시길
          바랍니다.
        </p>
      </div>
      <div css={buttonContainerStyle}>
        <FullButton
          onClick={() => navigate(PATH.HOME)}
          styleType="primary"
          customStyle={buttonStyle}
        >
          홈으로 이동
        </FullButton>
        <FullButton
          onClick={() => navigate(PATH.HOME)}
          styleType="signin"
          customStyle={buttonStyle}
        >
          로그인 하러 가기
        </FullButton>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${theme.colors.bgGray};
  padding: 0 20px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.primary};
  margin-bottom: 20px;
`;

const messageContainerStyle = css`
  width: 100%;
  max-width: 480px;
  margin-bottom: 30px;
`;

const messageStyle = css`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.darkGray};
  text-align: left;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 275px;
`;

const buttonStyle = css`
  flex: 1;
  padding: 10px 15px;
  font-size: ${theme.fontSizes.base};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

export default Error;
