import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import DraggablePlaylist from '@/components/playlistDetail/DraggablePlaylist';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import { useAuth } from '@/hooks/useAuth';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useUserById } from '@/hooks/useUserById';
import { UserModel } from '@/types/user';

const PlaylistDetailPage = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const { data: playlistUser } = useUserById(playlist?.userId || '');
  const user = useAuth();
  const [videos, setVideos] = useState(playlist?.videos || []);

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

  const isOwner = user?.uid === playlist?.userId;

  return (
    <>
      <BackHeader />
      <PlaylistInfo
        playlist={playlist}
        thumbnailUrl={videos[0] && `https://img.youtube.com/vi/${videos[0]?.videoId}/0.jpg`}
        user={userModel}
        isOwner={isOwner}
      />
      <DraggablePlaylist
        playlistId={playlist.playlistId}
        videos={videos}
        setVideos={setVideos}
        isDraggable={isOwner}
      />
    </>
  );
};

export default PlaylistDetailPage;
