import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { FaRegHeart } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';

import ProfileInfo from '../components/profile/ProfileInfo';

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
  { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
  { id: 'pli', label: '플리', icon: <FiPlay /> },
  { id: 'likes', label: '좋아요', icon: <FaRegHeart /> },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentUser = useAuth();
  const { userData, toggleFollow } = useUserData(userId || currentUser?.uid || null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser && userData) {
      setIsFollowing(userData.followers?.includes(currentUser.uid) || false);
    }
  }, [currentUser, userData]);

  const handleEditClick = () => {
    // setIsEditModalOpen(true);
    if (currentUser && userData) {
      navigate(`/profile/${currentUser.uid}/edit`, { state: { userData } });
    }
  };

  const handleFollowToggle = async () => {
    if (currentUser && userId && currentUser.uid !== userId) {
      await toggleFollow(currentUser.uid, userId);
      setIsFollowing(!isFollowing);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const isOwnProfile = currentUser?.uid === userId;

  return (
    <>
      <LogoHeader showSettings onSettingsClick={() => {}} />
      <ProfileInfo
        profileUserId={userId || currentUser?.uid || ''}
        userData={userData}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onEditClick={handleEditClick}
        onFollowToggle={handleFollowToggle}
      />
      <div>
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="post" activeTabId={activeTab}>
            <div>포스트 내용</div>
          </TabContent>
          <TabContent id="pli" activeTabId={activeTab}>
            <AddPlaylistButton customStyle={addPlaylistButtonStyle} />
            <Playlists id="my" playlists={playlists} />
          </TabContent>
          <TabContent id="likes" activeTabId={activeTab}>
            <div>좋아요 내용</div>
          </TabContent>
        </TabMenu>
      </div>
    </>
  );
};

const addPlaylistButtonStyle = css`
  margin-bottom: 24px;
`;

export default ProfilePage;
