import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/loading/Spinner';
import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import SelectablePlaylist from '@/components/playlistDetail/SelectablePlaylist';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useUserById } from '@/hooks/useUserById';
import { UserModel } from '@/types/user';

const SelectVideoPage = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  const { data: playlist, isLoading, isError } = usePlaylistById(playlistId);
  const { data: playlistUser } = useUserById(playlist?.userId || '');
  const navigate = useNavigate();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const videos = playlist?.videos || [];

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
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

  const onBackClick = () => navigate('/playlist');

  return (
    <>
      <BackHeader
        title="동영상 선택"
        onBackClick={onBackClick}
        rightButtonText="완료"
        onRightButtonClick={handleCompleteClick}
        rightButtonDisabled={!selectedVideoId}
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
    </>
  );
};

export default SelectVideoPage;
