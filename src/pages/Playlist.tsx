import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { dummyPlaylist } from '@/utils/dummy';

const tabs = [
  { id: 'my', label: '내 플리', icon: <HiOutlineBookmark /> },
  { id: 'subscribe', label: '구독한 플리', icon: <HiOutlinePlay /> },
];

const PlaylistPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <LogoHeader />

      <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
        <TabContent id="my" activeTabId={activeTab}>
          <AddPlaylistButton customStyle={addPlaylistButtonStyle} />
          <Playlists playlists={dummyPlaylist} />
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
