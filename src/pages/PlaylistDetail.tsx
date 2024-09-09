import { useEffect, useState } from 'react';

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
  const [videos, setVideos] = useState(playlist?.videos || []);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (playlist && playlist.videos) {
      setVideos(playlist.videos);
    }
  }, [playlist]);

  if (isLoading) {
    return;
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
      <PlaylistInfo
        playlist={playlist}
        thumbnailUrl={videos[0] && `https://img.youtube.com/vi/${videos[0]?.videoId}/0.jpg`}
        user={userModel}
        isOwner={isOwner}
        selectPli={state?.selectPli || false}
      />
      <PlaylistContents
        playlistId={playlist.playlistId}
        videos={videos}
        setVideos={setVideos}
        onVideoSelect={handleVideoSelect}
        selectedVideoId={selectedVideoId}
        isDraggable={isOwner && !state?.selectPli}
        selectPli={state?.selectPli}
      />
    </>
  );
};

export default PlaylistDetailPage;
