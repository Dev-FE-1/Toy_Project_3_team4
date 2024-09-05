import { css, Theme } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';

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
      <div>
        <p css={subTitleStyle}>지원</p>
        <ul css={listStyle}>
          <li>
            <Link to={PATH.PRIVACY_POLICY}>개인정보처리방침</Link>
          </li>
          <li>
            <Link to={PATH.TERM_OF_SERVICE}>서비스 이용약관</Link>
          </li>
        </ul>
      </div>
      <div css={settingContainerStyle}>
        <p css={subTitleStyle}>로그인</p>
        <button onClick={onSignOut} css={signOutButtonStyle}>
          로그아웃
        </button>
      </div>
    </>
  );
};

const settingContainerStyle = css`
  margin-top: 20px;
`;

const subTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  color: ${theme.colors.darkGray};
  padding-bottom: 8px;
`;

const listStyle = css`
  li {
    padding-bottom: 12px;
  }
`;

const signOutButtonStyle = (theme: Theme) => css`
  color: ${theme.colors.alertRed};
  font-weight: 500;
  background: none;
`;

export default SettingsPage;
