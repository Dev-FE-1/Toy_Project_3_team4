import { css } from '@emotion/react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineBolt } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { signInWithGoogle } from '@/api/firebaseAuth';
import FullButton from '@/components/common/buttons/FullButton';
import ChatBubble from '@/components/onboarding/ChatBubble';
import OnboardingSwiper from '@/components/onboarding/OnboardingSwiper';
import theme from '@/styles/theme';

const SignInPage = () => {
  const navigate = useNavigate();

  const onSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('로그인에 실패했습니다', error);
    }
  };

  return (
    <div css={mainStyle}>
      <OnboardingSwiper />

      <ChatBubble Icon={HiOutlineBolt} contents="5초만에 시작하기" customStyle={chatBubbleStyle} />
      <FullButton styleType="signin" customStyle={buttonStyle} onClick={onSignIn}>
        <FcGoogle />
        Google로 계속하기
      </FullButton>
      <p className="description">
        최초 로그인 시 계정을 생성하며, <br /> 플리의 <b>이용약관</b> 및 <b>개인정보처리방침</b>에
        동의하게 됩니다.
      </p>
    </div>
  );
};

const mainStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .description {
    margin-top: 28px;
    font-size: ${theme.fontSizes.micro};
    color: ${theme.colors.darkGray};
    text-align: center;

    b {
      color: ${theme.colors.darkestGray};
      font-weight: 500;
    }
  }
`;

const chatBubbleStyle = css`
  margin: 50px 0 24px;
`;

const buttonStyle = css`
  flex-direction: row;
  padding: 0;

  svg {
    font-size: 20px;
  }
`;

export default SignInPage;
