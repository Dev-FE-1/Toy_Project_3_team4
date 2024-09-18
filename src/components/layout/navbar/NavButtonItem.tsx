import { useState, useCallback } from 'react';

import { css } from '@emotion/react';
import { IconType } from 'react-icons';
import { HiLink, HiOutlineRectangleStack } from 'react-icons/hi2';

import FullModal from '@/components/common/modals/FullModal';
import OptionModal from '@/components/common/modals/OptionModal';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import AddPostPage from '@/pages/AddPost';
import NewPost from '@/pages/NewPost';
import SelectPliPage from '@/pages/SelectPli';

interface NavButtonItemProps {
  Icon: IconType;
  stroke?: number;
  onClick?: () => void;
}

const ANIMATION_DURATION = 300;

const NavButtonItem: React.FC<NavButtonItemProps> = ({ Icon, stroke, onClick }) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const {
    isOpen: isOptionModalOpen,
    open: openOptionModal,
    close: closeOptionModal,
  } = useModalWithOverlay('optionModal', 'addPost');
  const {
    isOpen: isAddPostModalOpen,
    open: openAddPostModal,
    close: closeAddPostModal,
  } = useModalWithOverlay('addPostModal', 'addPost');
  const {
    isOpen: isSelectPliFromPliModalOpen,
    open: openSelectPliFromPliModal,
    close: closeSelectPliFromPliModal,
  } = useModalWithOverlay('selectPliFromPliModal', 'addPost');
  const {
    isOpen: isNewPostModalOpen,
    open: openNewPostModal,
    close: closeNewPostModal,
  } = useModalWithOverlay('newPostModal', 'addPostFromPli');

  const handleOpenOptionModal = () => {
    openOptionModal();
  };

  const handleAddPostByLink = () => {
    closeOptionModal();
    setTimeout(() => {
      openAddPostModal();
    }, ANIMATION_DURATION);
  };

  const handleAddPostFromPlaylist = () => {
    closeOptionModal();
    setTimeout(() => {
      openSelectPliFromPliModal();
    }, ANIMATION_DURATION);
  };

  const handleCompleteSelectVideo = useCallback(
    (playlistId: string, videoId: string) => {
      setSelectedPlaylistId(playlistId);
      setSelectedVideoId(videoId);
      setTimeout(() => {
        openNewPostModal();
      }, ANIMATION_DURATION);
    },
    [openNewPostModal],
  );

  const handleCloseNewPost = () => {
    closeNewPostModal();
    setSelectedPlaylistId(null);
    setSelectedVideoId(null);
  };

  const modalOptions = [
    {
      label: '링크로 동영상 추가',
      Icon: HiLink,
      onClick: handleAddPostByLink,
    },
    {
      label: '플리에서 동영상 선택',
      Icon: HiOutlineRectangleStack,
      onClick: handleAddPostFromPlaylist,
    },
  ];

  return (
    <li>
      <button
        css={buttonStyle}
        type="button"
        onClick={onClick || handleOpenOptionModal}
        data-testid="add-post-button"
      >
        <Icon css={stroke ? iconStyle(stroke) : ''} />
      </button>

      <OptionModal
        isOpen={isOptionModalOpen}
        onClose={closeOptionModal}
        title="포스트 추가하기"
        options={modalOptions}
      />

      <FullModal isOpen={isAddPostModalOpen} onClose={closeAddPostModal}>
        <AddPostPage onClose={closeAddPostModal} />
      </FullModal>

      <FullModal isOpen={isSelectPliFromPliModalOpen} onClose={closeSelectPliFromPliModal}>
        <SelectPliPage
          onClose={closeSelectPliFromPliModal}
          type="fromPli"
          onCompleteSelectVideo={handleCompleteSelectVideo}
        />
      </FullModal>

      <FullModal isOpen={isNewPostModalOpen} onClose={handleCloseNewPost}>
        <NewPost
          playlistId={selectedPlaylistId || ''}
          videoId={selectedVideoId || ''}
          onClose={handleCloseNewPost}
        />
      </FullModal>
    </li>
  );
};

const buttonStyle = css`
  width: 100%;
  background-color: transparent;
`;

const iconStyle = (stroke: number) => css`
  stroke-width: ${stroke};
`;

export default NavButtonItem;
