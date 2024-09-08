import { useState, useEffect } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlinePlus } from 'react-icons/hi2';

import FullButton from '@/components/common/buttons/FullButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import Modal from '@/components/common/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { errorMessageStyle } from '@/styles/input';
import theme from '@/styles/theme';

const AddPlaylistButton: React.FC<{
  customStyle?: SerializedStyles;
  onAddPlaylist: (title: string, isPublic: boolean) => void;
}> = ({ customStyle, onAddPlaylist }) => {
  const user = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: playlists } = useUserPlaylists();

  useEffect(() => {
    if (playlists) {
      const existingTitles = playlists.map((playlist) => playlist.title);
      if (title.trim() === '') {
        setIsButtonEnabled(false);
        setErrorMessage('');
      } else if (existingTitles.includes(title.trim())) {
        setErrorMessage('이미 존재하는 플레이리스트 제목입니다.');
        setIsButtonEnabled(false);
      } else {
        setErrorMessage('');
        setIsButtonEnabled(true);
      }
    }
  }, [title, playlists]);

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setTitle('');
    setErrorMessage('');
    setIsButtonEnabled(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const handleAddPlaylist = () => {
    if (!user) return;

    onAddPlaylist(title, isPublic);
    onClose();
  };

  return (
    <>
      <div css={[buttonContainerStyle, customStyle]}>
        <button id="add" onClick={onClick} data-testid="add-playlist-button">
          <HiOutlinePlus size={20} />
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
            data-testid="playlist-title-input"
          />
          {errorMessage && <p css={errorMessageStyles}>{errorMessage}</p>}
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

    svg {
      stroke-width: 1.7;
    }
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

const errorMessageStyles = errorMessageStyle;

export default AddPlaylistButton;
