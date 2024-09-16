import { useState, useCallback } from 'react';

import { css } from '@emotion/react';

import Spinner from '@/components/common/loading/Spinner';
import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import SelectablePlaylist from '@/components/playlistDetail/SelectablePlaylist';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useUserById } from '@/hooks/useUserById';
import { UserModel } from '@/types/user';

interface SelectVideoPageProps {
  playlistId: string;
  onClose?: () => void;
  onCloseSelectPli?: () => void;
  onCompleteSelectVideo: (playlistId: string, videoId: string) => void;
}

const SelectVideoPage: React.FC<SelectVideoPageProps> = ({
  playlistId,
  onClose,
  onCloseSelectPli,
  onCompleteSelectVideo,
}) => {
  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const { data: playlistUser } = useUserById(playlist?.userId || '');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const videos = playlist?.videos || [];

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const handleCompleteClick = useCallback(() => {
    if (selectedVideoId) {
      onCloseSelectPli && onCloseSelectPli();
      onClose && onClose();
      onCompleteSelectVideo(playlistId, selectedVideoId);
    }
  }, [selectedVideoId, onCloseSelectPli, onClose, onCompleteSelectVideo, playlistId]);

  const handleBackClick = () => {
    onClose && onClose();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !playlist) {
    return null;
  }

  const userModel: UserModel = {
    userId: playlistUser?.userId ?? '',
    displayName: playlistUser?.displayName ?? '',
    email: playlistUser?.email ?? '',
    photoURL: playlistUser?.photoURL ?? '',
    subscriptions: playlistUser?.subscriptions ?? [],
  };

  return (
    <div css={selectVideoStyle}>
      <BackHeader
        title="동영상 선택"
        onBackClick={handleBackClick}
        rightButtonText="다음"
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
  );
};

const selectVideoStyle = css`
  width: 100%;
`;

export default SelectVideoPage;
