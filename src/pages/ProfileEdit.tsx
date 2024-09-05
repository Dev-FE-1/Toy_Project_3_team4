import { useEffect, useRef, useState } from 'react';

import { css, Theme } from '@emotion/react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useNavigate, useLocation } from 'react-router-dom';

import FullButton from '@/components/common/buttons/FullButton';
import Input from '@/components/common/inputs/Input';
import Textarea from '@/components/common/inputs/Textarea';
import BackHeader from '@/components/layout/header/BackHeader';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { useToastStore } from '@/stores/toastStore';
import { UserData } from '@/types/profile';

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuth();
  const { updateUserData } = useUserData(currentUser?.uid || null);
  const addToast = useToastStore((state) => state.addToast);

  const initialUserData = location.state?.userData as UserData | undefined;

  const [name, setName] = useState(initialUserData?.displayName || '');
  const [bio, setBio] = useState(initialUserData?.bio || '');
  const [photoURL, setPhotoURL] = useState(initialUserData?.photoURL || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!initialUserData) {
      navigate(`/profile/${currentUser?.uid}`);
    }
  }, [initialUserData, currentUser, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setPhotoURL('');
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    try {
      await updateUserData({
        displayName: name,
        bio,
        photoURL,
      });
      addToast('프로필이 수정되었습니다.');
      navigate(`/profile/${currentUser.uid}`);
    } catch (error) {
      console.error('Error updating user data:', error);
      addToast('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${currentUser?.uid}`);
  };

  if (!initialUserData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackHeader title="프로필 수정" />
      <div css={pageContentStyle}>
        <div css={imageContainerStyle}>
          {photoURL ? (
            <img src={photoURL} alt="Profile" />
          ) : (
            <div css={placeholderImageStyle}>No Image</div>
          )}
          <span onClick={handleImageClick}>
            <HiOutlinePhoto />
          </span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          css={hiddenInputStyle}
          id="profile-image-upload"
        />
        <button onClick={photoURL ? handleDeleteImage : handleImageClick} css={imageChangeButton}>
          {photoURL ? '이미지 삭제' : '이미지 추가'}
        </button>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임"
        />
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="소개" />
        <FullButton styleType="primary" onClick={handleSaveProfile}>
          수정하기
        </FullButton>
        <FullButton styleType="cancel" onClick={handleCancel}>
          취소하기
        </FullButton>
      </div>
    </>
  );
};

const pageContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const imageContainerStyle = (theme: Theme) => css`
  width: 120px;
  margin: 0 auto;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    bottom: 3%;
    border-radius: 50%;
    background: ${theme.colors.darkestGray};
    color: ${theme.colors.white};
    font-weight: 700;
    border: 4px solid ${theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${theme.colors.black};
    }
  }
`;

const placeholderImageStyle = (theme: Theme) => css`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkestGray};
`;

const imageChangeButton = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkestGray};
  background: none;
  margin-bottom: 20px;
`;

const hiddenInputStyle = css`
  display: none;
`;

export default ProfileEditPage;
