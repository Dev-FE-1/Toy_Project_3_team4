import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import FitButton from '@/components/common/buttons/FitButton';
import theme from '@/styles/theme';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/');
  };

  return (
    <div css={containerStyle}>
      <h1>404</h1>
      <p className="not-found-text">페이지를 찾을 수 없습니다</p>
      <p className="contents">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>

      <FitButton styleType="primary" onClick={onBack} customStyle={buttonStyle}>
        홈으로 이동
      </FitButton>
    </div>
  );
};

const containerStyle = css`
  text-align: center;

  h1 {
    margin-top: 5vh;
    font-size: 8vh;
    font-weight: 900;
    color: ${theme.colors.primary};
  }

  .not-found-text {
    font-size: 20px;
    font-weight: 600;
    margin: 12px 0;
  }

  .contents {
    margin-bottom: 24px;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.darkGray};
    text-align: center;
    line-height: 140%;

    @media screen and (min-width: ${theme.width.large}) {
      font-size: ${theme.fontSizes.base};
    }
  }
`;

const buttonStyle = css`
  padding: 16px 24px;
`;

export default NotFoundPage;
