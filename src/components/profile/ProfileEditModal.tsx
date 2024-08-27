import { useState } from 'react';

import { css } from '@emotion/react';

import FitButton from '../common/buttons/FitButton';
import Modal from '../common/Modal/Modal';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialBio?: string;
  initialPhotoURL?: string;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  initialName = '',
  initialBio = '',
  initialPhotoURL = '',
}) => {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [photoURL, setPhotoURL] = useState(initialPhotoURL);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleDeleteImage = () => {
    setPhotoURL('');
    setImageFile(null);
  };

  const handleSave = () => {
    console.log('Saving profile', { name, bio, photoURL, imageFile });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프로필 수정">
      <div css={modalContentStyle}>
        {photoURL && (
          <div css={imagePreviewStyle}>
            <img src={photoURL} alt="Profile" />
            <FitButton styleType="secondary" onClick={handleDeleteImage}>
              이미지 삭제
            </FitButton>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} css={inputStyle} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          css={inputStyle}
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개"
          css={textareaStyle}
        />
        <FitButton styleType="primary" onClick={handleSave}>
          저장
        </FitButton>
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

const imagePreviewStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const inputStyle = css`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const textareaStyle = css`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

export default ProfileEditModal;
