import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useNavigate, useLocation } from 'react-router-dom';

import Avatar from '@/components/common/Avatar';
import FullButton from '@/components/common/buttons/FullButton';
import Input from '@/components/common/inputs/Input';
import Textarea from '@/components/common/inputs/Textarea';
import Spinner from '@/components/common/loading/Spinner';
import BackHeader from '@/components/layout/header/BackHeader';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import theme from '@/styles/theme';
import { UserData } from '@/types/profile';

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuth();
  const { updateUserData } = useUserData(currentUser?.uid || null);

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
      navigate(`/profile/${currentUser.uid}`);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${currentUser?.uid}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!initialUserData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <BackHeader title="프로필 수정" onBackClick={handleBackClick} />
      <div css={pageContentStyle}>
        <div css={imageContainerStyle}>
          <Avatar size="extraLarge" url={photoURL} />
          <span onClick={handleImageClick}>
            <HiOutlinePhoto size={20} />
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
        <button onClick={handleDeleteImage} css={imageChangeButton}>
          {photoURL && '이미지 삭제'}
        </button>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          customStyle={inputStyle}
          label="닉네임"
        />
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="소개를 입력해주세요"
          label="소개"
          customStyle={inputStyle}
        />
      </div>
      <div css={buttonContainerStyle}>
        <FullButton
          styleType={name.trim() !== '' ? 'primary' : 'disabled'}
          onClick={handleSaveProfile}
        >
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
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 156px;
`;

const imageContainerStyle = css`
  position: relative;
  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: ${theme.colors.lightestGray};
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-placeholder {
      width: 60%;
      height: 60%;
    }
  }

  span {
    position: absolute;
    width: 44px;
    height: 44px;
    right: -7px;
    bottom: 3px;
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

const imageChangeButton = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkestGray};
  background: none;
  margin-bottom: 20px;
`;

const hiddenInputStyle = css`
  display: none;
`;

const inputStyle = css`
  padding: 8px 14px;
`;

const buttonContainerStyle = css`
  position: fixed;
  bottom: 0;
  width: calc(100% - 32px);
  max-width: calc(${theme.width.max} - 32px);
  padding-bottom: 32px;

  button:first-child {
    margin-bottom: 8px;
  }
`;

export default ProfileEditPage;
