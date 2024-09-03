import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { useAddPlaylist } from '@/hooks/useAddPlaylist';
import { useUserPlaylists } from '@/hooks/usePlaylists';

const tabs = [
  { id: 'my', label: '내 플리', icon: <HiOutlineBookmark /> },
  { id: 'subscribe', label: '구독한 플리', icon: <HiOutlinePlay /> },
];

const PlaylistPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const navigate = useNavigate();

  const { data: myPlaylists, isLoading, error } = useUserPlaylists();
  const addPlaylistMutation = useAddPlaylist();
  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const handleAddPlaylist = (title: string, isPublic: boolean) => {
    addPlaylistMutation.mutate({ title, isPublic });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading playlists</p>;
  }

  return (
    <>
      <LogoHeader />
      <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
        <TabContent id="my" activeTabId={activeTab}>
          <AddPlaylistButton
            onAddPlaylist={handleAddPlaylist}
            customStyle={addPlaylistButtonStyle}
          />
          <Playlists playlists={myPlaylists || []} onPlaylistClick={handlePlaylistClick} />
        </TabContent>
        <TabContent id="subscribe" activeTabId={activeTab}>
          <Playlists playlists={[]} />
        </TabContent>
      </TabMenu>
    </>
  );
};

const addPlaylistButtonStyle = css`
  margin-bottom: 24px;
`;

export default PlaylistPage;
