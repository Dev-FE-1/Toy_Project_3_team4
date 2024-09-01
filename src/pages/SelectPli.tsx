import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import CloseHeader from '@/components/layout/header/CloseHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { useAddPlaylist } from '@/hooks/useAddPlaylist';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlaylists } from '@/hooks/usePlaylists';

const tabs = [
  { id: 'my', label: '내 플리', icon: <HiOutlineBookmark /> },
  { id: 'subscribe', label: '구독한 플리', icon: <HiOutlinePlay /> },
];

const SelectPliPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');

  const state = location.state as { type?: 'byLink' | 'fromPli' };
  const user = useAuth();
  const { data: myPlaylists, error } = useUserPlaylists();
  const addPlaylistMutation = useAddPlaylist();

  const handleAddPlaylist = (title: string, isPublic: boolean) => {
    addPlaylistMutation.mutate({ title, isPublic });
  };

  const handlePlaylistClick = (playlistId: string, title: string) => {
    state?.type === 'byLink'
      ? navigate(
          `/post/add?pli=${playlistId}&title=${encodeURIComponent(title)}&videoId=${videoId}`,
        )
      : navigate(`/playlist/${playlistId}`, { state: { selectPli: true } });
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

  // 동영상이 있는 플레이리스트만 필터링
  const filteredPlaylists = myPlaylists?.filter((playlist) => playlist.videos.length > 0) || [];

  return (
    <>
      {state?.type === 'byLink' ? (
        <BackHeader onBackClick={handleBackClick} title="저장할 플리 선택" />
      ) : (
        <CloseHeader onCloseClick={handleBackClick} title="플리 선택" />
      )}

      {state?.type === 'byLink' ? (
        <AddPlaylistButton customStyle={addPlaylistButtonStyle} onAddPlaylist={handleAddPlaylist} />
      ) : (
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="my" activeTabId={activeTab}>
            <Playlists
              playlists={filteredPlaylists}
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
