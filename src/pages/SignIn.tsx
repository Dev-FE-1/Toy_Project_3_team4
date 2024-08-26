import { css } from '@emotion/react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineBolt } from 'react-icons/hi2';

import FullButton from '@/components/common/buttons/FullButton';
import ChatBubble from '@/components/onboarding/ChatBubble';
import OnboardingSwiper from '@/components/onboarding/OnboardingSwiper';
import theme from '@/styles/theme';

const SignInPage = () => {
  return (
    <main css={mainStyle}>
      <OnboardingSwiper />

      <ChatBubble Icon={HiOutlineBolt} contents="5초만에 시작하기" customStyle={chatBubbleStyle} />
      <FullButton styleType="signin" customStyle={buttonStyle}>
        <FcGoogle />
        Google로 계속하기
      </FullButton>
      <p className="description">
        최초 로그인 시 계정을 생성하며, <br /> 플리의 <b>이용약관</b> 및 <b>개인정보처리방침</b>에
        동의하게 됩니다.
      </p>
    </main>
  );
};

const mainStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${theme.width.max};
  height: 100vh;
  padding: 0 16px;
  margin: 0 auto;
  background-color: ${theme.colors.white};

  @media screen and (min-width: ${theme.width.max}) {
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
  }

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
