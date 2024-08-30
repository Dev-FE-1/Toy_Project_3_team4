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
      <button onClick={onSignOut}>로그아웃</button>
    </>
  );
};

export default SettingsPage;
