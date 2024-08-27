import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { PlaylistModel } from '@/types/playlist';

const playlists: PlaylistModel[] = [
  {
    playlistId: '1',
    userId: 'hi',
    title: '내가 만든 플리',
    description: '내가 만들었지',
    createdAt: '2024-08-22 12:36:55',
    isPublic: true,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
      },
    ],
  },
  {
    playlistId: '2',
    userId: 'hi',
    title: '내가 만든 플리2',
    description: '내가 만들었지2',
    createdAt: '2024-08-22 12:36:55',
    isPublic: true,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
      },
    ],
  },
  {
    playlistId: '3',
    userId: 'hi',
    title: '내가 만든 플리3',
    description: '내가 만들었지3',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
      },
    ],
  },
  {
    playlistId: '4',
    userId: 'hi',
    title: '내가 만든 플리4',
    description: '내가 만들었지4',
    createdAt: '2024-08-22 12:36:55',
    isPublic: true,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
      },
    ],
  },
  {
    playlistId: '5',
    userId: 'hi',
    title: '내가 만든 플리5',
    description: '내가 만들었지5',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [],
  },
];

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
          <Playlists id="my" playlists={playlists} />
        </TabContent>
        <TabContent id="subscribe" activeTabId={activeTab}>
          <Playlists id="subscribe" playlists={[]} />
        </TabContent>
      </TabMenu>
    </>
  );
};

const addPlaylistButtonStyle = css`
  margin-bottom: 24px;
`;

export default PlaylistPage;
