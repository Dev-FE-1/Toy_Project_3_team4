import { useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlinePlus } from 'react-icons/hi2';

import FullButton from '@/components/common/buttons/FullButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import Modal from '@/components/common/Modal';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';

interface AddPlaylistButtonProps {
  customStyle?: SerializedStyles;
  onAddPlaylist: (title: string, isPublic: boolean) => void;
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({ customStyle, onAddPlaylist }) => {
  const user = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setTitle('');
    setIsButtonEnabled(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setIsButtonEnabled(newTitle.trim() !== '');
  };

  const handleAddPlaylist = () => {
    if (!user) return;

    onAddPlaylist(title, isPublic);
    onClose();
  };

  return (
    <>
      <div css={[buttonContainerStyle, customStyle]}>
        <button id="add" onClick={onClick}>
          <HiOutlinePlus />
        </button>
        <label htmlFor="add">새로운 플리 추가</label>
      </div>
      <Modal isOpen={isModalOpen} onClose={onClose} title="플리 추가하기">
        <div css={modalContentContainer}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="플리 제목을 입력하세요"
          />
          <div className="toggleStyle">
            전체 공개
            <ToggleButton enabled={isPublic} setEnabled={setIsPublic} />
          </div>
          <FullButton
            styleType={isButtonEnabled ? 'primary' : 'disabled'}
            onClick={handleAddPlaylist}
          >
            추가하기
          </FullButton>
          <FullButton styleType="cancel" onClick={onClose}>
            취소하기
          </FullButton>
        </div>
      </Modal>
    </>
  );
};

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    display: flex;
    width: 32px;
    height: 32px;
    padding: 3px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    font-size: ${theme.fontSizes.micro};
    color: ${theme.colors.darkestGray};
    background-color: ${theme.colors.lightGray};
  }

  label {
    color: ${theme.colors.darkestGray};
    font-weight: 700;
    font-size: ${theme.fontSizes.small};
  }
`;

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;
  }

  & .titleStyle {
    color: ${theme.colors.darkGray};
    font-size: ${theme.fontSizes.base};
    padding: 8px;
    width: 100%;
    border-radius: 4px;
  }

  & .toggleStyle {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
  }
`;

export default AddPlaylistButton;
