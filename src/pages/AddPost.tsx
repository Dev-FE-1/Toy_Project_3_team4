import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HiOutlineLink } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import FullModal from '@/components/common/modals/FullModal';
import CloseHeader from '@/components/layout/header/CloseHeader';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import NewPost from '@/pages/NewPost';
import SelectPliPage from '@/pages/SelectPli';
import { errorMessageStyle } from '@/styles/input';
import theme from '@/styles/theme';
import { extractVideoId, validateVideoId } from '@/utils/youtubeUtils';

interface AddPostPageProps {
  onClose?: () => void;
}

const AddPostPage: React.FC<AddPostPageProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { data: userPlaylists } = useUserPlaylists();

  const [inputUrl, setInputUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<{ id: string; title: string } | null>(
    null,
  );

  useEffect(() => {
    if (userPlaylists) {
      const defaultPlaylist = userPlaylists.find(
        (playlist) => playlist.title === '분류되지 않은 목록',
      );
      if (defaultPlaylist) {
        setSelectedPlaylist({ id: defaultPlaylist.playlistId, title: defaultPlaylist.title });
      }
    }
  }, [userPlaylists]);

  const {
    isOpen: isSelectPliModalOpen,
    open: openSelectPliModal,
    close: closeSelectPliModal,
  } = useModalWithOverlay('selectPliModal', 'addPost');
  const {
    isOpen: isNewPostModalOpen,
    open: openNewPostModal,
    close: closeNewPostModal,
  } = useModalWithOverlay('newPostModal', 'addPostByLink');

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleOnShare = () => {
    if (videoId && selectedPlaylist) {
      openNewPostModal();
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);

    if (!url) {
      setVideoId(null);
      setError(null);
      return;
    }

    const id = extractVideoId(url);
    if (id) {
      const isValid = await validateVideoId(id);
      if (isValid) {
        setVideoId(id);
        setError(null);
      } else {
        setVideoId(null);
        setError('올바른 YouTube 링크가 아닙니다');
      }
    } else {
      setVideoId(null);
      setError('올바른 YouTube 링크가 아닙니다');
    }
  };

  const handlePliSelectClick = () => {
    openSelectPliModal();
  };

  const handlePlaylistSelect = (id: string, title: string) => {
    setSelectedPlaylist({ id, title });
    closeSelectPliModal();
  };

  const handleCloseNewPost = () => {
    closeNewPostModal();
    handleOnClose();
  };

  return (
    <>
      <CloseHeader
        onCloseClick={handleOnClose}
        title="동영상 추가"
        rightButtonText="다음"
        onRightButtonClick={handleOnShare}
        rightButtonDisabled={!videoId}
        usePortal={false}
      />
      <div css={addPostContainer}>
        <div className="input-container">
          <input
            placeholder="YouTube 동영상 링크를 입력해주세요."
            onChange={handleInputChange}
            value={inputUrl}
          />
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        <p className="label">플리 선택</p>
        <button onClick={handlePliSelectClick}>
          {selectedPlaylist?.title || '분류되지 않은 목록'}
        </button>
        <div className="thumbnail-wrapper">
          <VideoThumbnail
            url={
              videoId && videoId !== 'null'
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : ''
            }
            isPublic={true}
            customStyle={thumbnailStyle}
          />
          {(!videoId || videoId === 'null') && <HiOutlineLink size={32} />}
        </div>
      </div>
      <FullModal isOpen={isSelectPliModalOpen} onClose={closeSelectPliModal}>
        <SelectPliPage
          onClose={closeSelectPliModal}
          onSelectPlaylist={handlePlaylistSelect}
          type="byLink"
        />
      </FullModal>
      <FullModal isOpen={isNewPostModalOpen} onClose={closeNewPostModal}>
        <NewPost
          videoId={videoId || ''}
          playlistId={selectedPlaylist?.id || ''}
          onClose={handleCloseNewPost}
        />
      </FullModal>
    </>
  );
};

const addPostContainer = css`
  width: 100%;
  font-family: Pretendard;
  & .input-container {
    margin-bottom: 16px;
    padding: 0 8px;
  }
  & > p {
    margin: 0;
    font-size: ${theme.fontSizes.micro};
    padding-left: 8px;
  }
  & > button {
    font-size: ${theme.fontSizes.small};
    margin: 8px 0 16px;
    width: 100%;
    display: flex;
    height: 36px;
    padding: 4px 14px;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray};
    background: white;
    color: #475569;
  }

  & .thumbnail-wrapper {
    position: relative;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const thumbnailStyle = css`
  .image-container {
    position: relative;
    background: ${theme.colors.lightGray};
  }
`;

const errorMessage = errorMessageStyle;

export default AddPostPage;
