import { useEffect, useRef, useState } from 'react';

import { css, Theme } from '@emotion/react';
import { HiOutlinePhoto } from 'react-icons/hi2';

import FullButton from '../common/buttons/FullButton';
import Input from '../common/inputs/Input';
import Textarea from '../common/inputs/Textarea';
import Modal from '../common/Modal/Modal';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialBio?: string;
  initialPhotoURL?: string;
  onSave: (name: string, bio: string, photoURL: string, imageFile: File | null) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  initialName = '',
  initialBio = '',
  initialPhotoURL = '',
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [photoURL, setPhotoURL] = useState(initialPhotoURL);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setBio(initialBio);
      setPhotoURL(initialPhotoURL);
      setImageFile(null);
    }
  }, [isOpen, initialName, initialBio, initialPhotoURL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
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
    setImageFile(null);
  };

  const handleSave = () => {
    onSave(name, bio, photoURL, imageFile);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프로필 수정">
      <div css={modalContentStyle}>
        <div css={imageContainerStyle}>
          {photoURL ? (
            <img src={photoURL} alt="Profile" css={imagePreviewStyle} />
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
          {photoURL ? '이미지 삭제' : ''}
        </button>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임"
        />
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="소개" />
        <FullButton styleType="primary" onClick={handleSave}>
          수정하기
        </FullButton>
        <FullButton styleType="cancel" onClick={onClose}>
          취소하기
        </FullButton>
      </div>
    </Modal>
  );
};

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  width: 100%;
`;

const imageContainerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 20%;
    bottom: 6%;
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

const imagePreviewStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
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
  margin-bottom: 15px;
`;

const hiddenInputStyle = css`
  display: none;
`;

export default ProfileEditModal;
