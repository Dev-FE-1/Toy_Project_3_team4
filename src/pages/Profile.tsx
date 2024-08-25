import Header from '@/components/layout/header/Header';

const ProfilePage = () => {
  return (
    <>
      <Header showLogo showSettingButton onSettingClick={() => console.log('Setting')} />
      <div>ProfilePage</div>
    </>
  );
};

export default ProfilePage;
