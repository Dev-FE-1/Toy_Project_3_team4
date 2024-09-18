import { useState, useEffect } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlinePlus } from 'react-icons/hi2';

import { useAuth } from '@/hooks/useAuth';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import theme from '@/styles/theme';

import AddFixModal from '../common/modals/AddFixModal';

const AddPlaylistButton: React.FC<{
  customStyle?: SerializedStyles;
  onAddPlaylist: (title: string, isPublic: boolean) => void;
}> = ({ customStyle, onAddPlaylist }) => {
  const user = useAuth();
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    isOpen: isAddFixModalOpen,
    open: openAddFixModal,
    close: closeAddFixModal,
  } = useModalWithOverlay('addFixModal', 'addPlaylist');
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
    openAddFixModal();
  };

  const onClose = () => {
    closeAddFixModal();
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
      <AddFixModal
        isOpen={isAddFixModalOpen}
        onClose={onClose}
        title="플리 추가하기"
        inputValue={title}
        onInputChange={handleTitleChange}
        errorMessage={errorMessage}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        isButtonEnabled={isButtonEnabled}
        onSubmit={handleAddPlaylist}
      />
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

export default AddPlaylistButton;
