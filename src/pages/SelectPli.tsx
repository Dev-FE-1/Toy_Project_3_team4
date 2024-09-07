import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import CloseHeader from '@/components/layout/header/CloseHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useAddPlaylist } from '@/hooks/usePostPlaylist';
import { useAddVideosToMyPlaylist } from '@/hooks/useVideoToPlaylist';
import { makeVideoObj } from '@/utils/video';

const tabs = [
  { id: 'my', label: '내 플리', icon: <HiOutlineBookmark /> },
  { id: 'subscribe', label: '구독한 플리', icon: <HiOutlinePlay /> },
];

const SelectPliPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId } = useParams();
  const videoObject = makeVideoObj(videoId || '');
  const state = location.state as { type?: 'byLink' | 'fromPli' };
  const user = useAuth();
  const { data: myPlaylists, error } = useUserPlaylists();
  const addPlaylistMutation = useAddPlaylist();

  const addVideoToPlaylistMutation = useAddVideosToMyPlaylist();

  const handleAddPlaylist = (title: string, isPublic: boolean) => {
    addPlaylistMutation.mutate({ title, isPublic });
  };

  const handlePlaylistClick = (playlistId: string, title: string) => {
    if (videoId) {
      addVideoToPlaylistMutation.mutate({ playlistId, videos: [videoObject] });
      navigate(`/playlist/${playlistId}`, { state: { selectPli: false } });
    } else if (state?.type === 'byLink') {
      navigate(`/post/add?pli=${playlistId}&title=${encodeURIComponent(title)}&videoId=${videoId}`);
    } else {
      navigate(`/playlist/${playlistId}`, { state: { selectPli: true } });
    }
  };

  function handleBackClick() {
    navigate(-1);
  }

  if (!user) {
    return <p>Please log in to view your playlists.</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const filteredPlaylists = myPlaylists?.filter((playlist) => playlist.videos.length > 0) || [];

  if (videoId) {
    return (
      <>
        <BackHeader onBackClick={handleBackClick} title="저장할 플리 선택" />
        <AddPlaylistButton customStyle={addPlaylistButtonStyle} onAddPlaylist={handleAddPlaylist} />
        <Playlists
          playlists={myPlaylists || []}
          customStyle={playlistStyle}
          customVideoStyle={videoStyle}
          onPlaylistClick={handlePlaylistClick}
          isColumn={false}
        />
      </>
    );
  }

  return (
    <>
      {state?.type === 'byLink' ? (
        <BackHeader onBackClick={handleBackClick} title="저장할 플리 선택" />
      ) : (
        <CloseHeader onCloseClick={handleBackClick} title="플리 선택" />
      )}

      {state?.type === 'byLink' ? (
        <>
          <AddPlaylistButton
            customStyle={addPlaylistButtonStyle}
            onAddPlaylist={handleAddPlaylist}
          />
          <Playlists
            playlists={myPlaylists || []}
            customStyle={playlistStyle}
            customVideoStyle={videoStyle}
            onPlaylistClick={handlePlaylistClick}
            isColumn={false}
          />
        </>
      ) : (
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="my" activeTabId={activeTab}>
            <Playlists
              playlists={filteredPlaylists || []}
              customStyle={playlistStyle}
              customVideoStyle={videoStyle}
              onPlaylistClick={handlePlaylistClick}
              isColumn={false}
            />
          </TabContent>
          <TabContent id="subscribe" activeTabId={activeTab}>
            <Playlists
              playlists={[]}
              customStyle={playlistStyle}
              customVideoStyle={videoStyle}
              onPlaylistClick={handlePlaylistClick}
              isColumn={false}
            />
          </TabContent>
        </TabMenu>
      )}
    </>
  );
};

const addPlaylistButtonStyle = css`
  margin-bottom: 24px;
`;

const playlistStyle = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .playlist-info {
    margin-left: 12px;
  }
`;

const videoStyle = css`
  width: 100px;
  height: auto;
  flex-shrink: 0;
`;

export default SelectPliPage;
