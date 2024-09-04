import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { signOutWithGoogle } from '@/api/firebaseAuth';
import BackHeader from '@/components/layout/header/BackHeader';
import { PATH } from '@/constants/path';

const SettingsPage = () => {
  const navigate = useNavigate();

  const signOutHandler = {
    onSuccess: () => {
      navigate(PATH.SIGN_IN);
    },
    onError: (error: unknown) => {
      console.error('로그아웃 실패:', error);
    },
  };

  const onSignOut = async () => {
    await signOutWithGoogle(signOutHandler.onSuccess, signOutHandler.onError);
  };

  return (
    <>
      <BackHeader title="설정" />
      <div css={settingContainerstyle}>
        <p css={subTitleStyle}>지원</p>
        <ul>
          <li css={subLiStyle}>개인정보처리방침</li>
          <li css={subLiStyle}>서비스 이용약관</li>
        </ul>
      </div>
      <div css={settingContainerstyle}>
        <p css={subTitleStyle}>로그인</p>
        <button onClick={onSignOut} css={signOutButtonStyle}>
          로그아웃
        </button>
      </div>
    </>
  );
};

const settingContainerstyle = css`
  margin-top: 32px;
`;

const subTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkGray};
  padding-bottom: 8px;
`;

const subLiStyle = css`
  padding-bottom: 8px;
`;

const signOutButtonStyle = (theme: Theme) => css`
  color: ${theme.colors.alertRed};
  background: none;
`;

export default SettingsPage;
