import { useState } from 'react';

import { useLocation, useParams, useNavigate } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistContents from '@/components/playlistDetail/PlaylistContents';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import { useAuth } from '@/hooks/useAuth';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { UserModel } from '@/types/user';

const PlaylistDetailPage = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { selectPli?: boolean };
  const user = useAuth();
  const navigate = useNavigate();

  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  if (isLoading) {
    return <p>로딩 중입니다...</p>;
  }

  if (!user) {
    console.warn('사용자 정보를 찾을 수 없습니다.');
    return <p>사용자 정보를 찾을 수 없습니다.</p>;
  }

  const userModel: UserModel = {
    userId: user?.uid ?? '',
    displayName: user?.displayName ?? '',
    email: user?.email ?? '',
    photoURL: user?.photoURL ?? '',
  };

  if (isError || !playlist) {
    console.warn('플레이리스트를 찾을 수 없습니다.');
    return <p>플레이리스트를 찾을 수 없습니다.</p>;
  }

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const handleCompleteClick = () => {
    if (selectedVideoId) {
      navigate(`/post/add/newpost?pli=${playlistId}&videoId=${selectedVideoId}`);
    }
  };
  return (
    <>
      <BackHeader
        title={state?.selectPli ? '동영상 선택' : undefined}
        rightButtonText={'완료'}
        onrightButtonClick={state?.selectPli ? handleCompleteClick : undefined}
        rightButtonDisabled={!selectedVideoId}
      />
      <PlaylistInfo playlist={playlist} user={userModel} />
      <PlaylistContents
        videos={playlist.videos}
        onVideoSelect={handleVideoSelect}
        selectedVideoId={selectedVideoId}
        selectPli={state?.selectPli}
      />
    </>
  );
};

export default PlaylistDetailPage;
