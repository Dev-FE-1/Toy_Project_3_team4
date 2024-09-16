import { useState } from 'react';

import { css } from '@emotion/react';

import Spinner from '@/components/common/loading/Spinner';
import FullModal from '@/components/common/modals/FullModal';
import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import SelectablePlaylist from '@/components/playlistDetail/SelectablePlaylist';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useUserById } from '@/hooks/useUserById';
import NewPost from '@/pages/NewPost';
import { UserModel } from '@/types/user';

interface SelectVideoPageProps {
  playlistId: string;
  onClose?: () => void;
  handleSelectPliClose: () => void;
}

const SelectVideoPage: React.FC<SelectVideoPageProps> = ({
  playlistId,
  onClose,
  handleSelectPliClose,
}) => {
  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const { data: playlistUser } = useUserById(playlist?.userId || '');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const {
    isOpen: isNewPostModalOpen,
    open: openNewPostModal,
    close: closeNewPostModal,
  } = useModalWithOverlay('newPostModal', 'selectVideo');

  const videos = playlist?.videos || [];

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError || !playlist) {
    return;
  }

  const userModel: UserModel = {
    userId: playlistUser?.userId ?? '',
    displayName: playlistUser?.displayName ?? '',
    email: playlistUser?.email ?? '',
    photoURL: playlistUser?.photoURL ?? '',
    subscriptions: playlistUser?.subscriptions ?? [],
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const handleCompleteClick = () => {
    if (selectedVideoId) {
      openNewPostModal();
    }
  };

  const handleBackClick = () => {
    onClose && onClose();
  };

  const handleCloseNewPost = () => {
    closeNewPostModal();
    handleSelectPliClose();
    onClose && onClose();
  };

  return (
    <>
      <div css={selectVideoStyle}>
        <BackHeader
          title="동영상 선택"
          onBackClick={handleBackClick}
          rightButtonText="완료"
          onRightButtonClick={handleCompleteClick}
          rightButtonDisabled={!selectedVideoId}
          usePortal={false}
        />
        <PlaylistInfo
          playlist={playlist}
          thumbnailUrl={videos[0] && `https://img.youtube.com/vi/${videos[0]?.videoId}/0.jpg`}
          user={userModel}
          selectPli={true}
          isOwner={true}
        />
        <SelectablePlaylist
          videos={videos}
          onVideoSelect={handleVideoSelect}
          selectedVideoId={selectedVideoId}
        />
      </div>
      <FullModal isOpen={isNewPostModalOpen} onClose={closeNewPostModal}>
        <NewPost
          playlistId={playlistId}
          videoId={selectedVideoId || ''}
          onClose={handleCloseNewPost}
        />
      </FullModal>
    </>
  );
};

const selectVideoStyle = css`
  width: 100%;
`;

export default SelectVideoPage;
