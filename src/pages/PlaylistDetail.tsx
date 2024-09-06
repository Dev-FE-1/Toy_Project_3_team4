import { useState } from 'react';

import { useLocation, useParams, useNavigate } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistContents from '@/components/playlistDetail/PlaylistContents';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import { useAuth } from '@/hooks/useAuth';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useUserById } from '@/hooks/useUserById';
import { UserModel } from '@/types/user';

const PlaylistDetailPage = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { selectPli?: boolean };
  const navigate = useNavigate();

  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const { data: playlistUser } = useUserById(playlist?.userId || '');
  const user = useAuth();

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  if (isLoading) {
    return <p>로딩 중입니다...</p>;
  }

  if (isError || !playlist) {
    console.warn('플레이리스트를 찾을 수 없습니다.');
    return <p>플레이리스트를 찾을 수 없습니다.</p>;
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
      navigate(`/post/add/newPost?pli=${playlistId}&videoId=${selectedVideoId}`);
    }
  };

  const isOwner = user?.uid === playlist?.userId;
  return (
    <>
      <BackHeader
        title={state?.selectPli ? '동영상 선택' : undefined}
        rightButtonText={'완료'}
        onRightButtonClick={state?.selectPli ? handleCompleteClick : undefined}
        rightButtonDisabled={!selectedVideoId}
      />
      <PlaylistInfo playlist={playlist} user={userModel} isOwner={isOwner} />
      <PlaylistContents
        videos={playlist.videos}
        onVideoSelect={handleVideoSelect}
        selectedVideoId={selectedVideoId}
        isDraggable={isOwner && !state?.selectPli}
        isOwner={isOwner}
      />
    </>
  );
};

export default PlaylistDetailPage;
