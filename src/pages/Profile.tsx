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
import Post from '@/components/post/Posts';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { PlaylistModel } from '@/types/playlist';
import { PostModel } from '@/types/post';

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

const posts: PostModel[] = [
  {
    postId: '1',
    userId: 'user1',
    userName: 'user1',
    userImgUrl:
      'https://s3-alpha-sig.figma.com/img/b858/1a3a/8f9a19b6eec05845c18e07081f487330?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gZIwgKx~G0RhiG51~cYwCDYSw8F7kX5YtigutjXf7EZP9H5durQGwbj3VmNpJhf1gYfzyK2TaSTHloXFrgizf5HXla7NqIVnu3e2UwYX9q39WXxy32ijoZWOENgw48MfkF95alexzORzxg62q4TKTkVWN~ItjTXK86dlo~Ro-aArqURnbt6EBHZ0o2~uBtS3amtfKAz7rrkOmpsj4xrrHiHCXuNWI1nDTYbhOYwWtz3FtveWLx9Cm7Cib7uv2187XFdDkV26CNSQ9ItEtcHQMys9CMU7V7ha7otRIC6dKnuZHNWA6wlI4sWUxU7qw1oCXXLUT1AHiNpDeXkjeK~QZA__',
    playlistId: 'playlist1',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user2', 'user3'],
    comments: [
      { commentId: 'comment1', userId: 'user2', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: {
      videoId: 'video1',
      title: 'NewJeans - OMG (Official MV)',
      videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
    },
  },
  {
    postId: '2',
    userId: 'user2',
    userName: 'user2',
    userImgUrl:
      'https://s3-alpha-sig.figma.com/img/b858/1a3a/8f9a19b6eec05845c18e07081f487330?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gZIwgKx~G0RhiG51~cYwCDYSw8F7kX5YtigutjXf7EZP9H5durQGwbj3VmNpJhf1gYfzyK2TaSTHloXFrgizf5HXla7NqIVnu3e2UwYX9q39WXxy32ijoZWOENgw48MfkF95alexzORzxg62q4TKTkVWN~ItjTXK86dlo~Ro-aArqURnbt6EBHZ0o2~uBtS3amtfKAz7rrkOmpsj4xrrHiHCXuNWI1nDTYbhOYwWtz3FtveWLx9Cm7Cib7uv2187XFdDkV26CNSQ9ItEtcHQMys9CMU7V7ha7otRIC6dKnuZHNWA6wlI4sWUxU7qw1oCXXLUT1AHiNpDeXkjeK~QZA__',
    playlistId: 'playlist1',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user1', 'user3', 'user4', 'user1', 'user3', 'user4', 'user1', 'user3', 'user4'],
    comments: [
      { commentId: 'comment1', userId: 'user1', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: {
      videoId: 'video1',
      title: 'NewJeans - OMG (Official MV)',
      videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
    },
  },
  {
    postId: '3',
    userId: 'RgkfFq9hLXPs3f9XYcPhkoERRfA3',
    userName: '체언지용용',
    userImgUrl:
      'https://s3-alpha-sig.figma.com/img/b858/1a3a/8f9a19b6eec05845c18e07081f487330?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gZIwgKx~G0RhiG51~cYwCDYSw8F7kX5YtigutjXf7EZP9H5durQGwbj3VmNpJhf1gYfzyK2TaSTHloXFrgizf5HXla7NqIVnu3e2UwYX9q39WXxy32ijoZWOENgw48MfkF95alexzORzxg62q4TKTkVWN~ItjTXK86dlo~Ro-aArqURnbt6EBHZ0o2~uBtS3amtfKAz7rrkOmpsj4xrrHiHCXuNWI1nDTYbhOYwWtz3FtveWLx9Cm7Cib7uv2187XFdDkV26CNSQ9ItEtcHQMys9CMU7V7ha7otRIC6dKnuZHNWA6wlI4sWUxU7qw1oCXXLUT1AHiNpDeXkjeK~QZA__',
    playlistId: 'playlist1',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user1', 'user3', 'user4', 'user1', 'user3', 'user4', 'user1', 'user3', 'user4'],
    comments: [
      { commentId: 'comment1', userId: 'user1', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: {
      videoId: 'video1',
      title: 'NewJeans - OMG (Official MV)',
      videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
    },
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
  const [filteredPosts, setFilteredPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    if (currentUser && userData) {
      setIsFollowing(userData.followers?.includes(currentUser.uid) || false);
    }
  }, [currentUser, userData]);

  useEffect(() => {
    if (currentUser) {
      const profilePosts = posts.filter((post) => post.userId === userId);
      setFilteredPosts(profilePosts);
    }
  }, [userId]);

  const handleEditClick = () => {
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
            {filteredPosts.map((post) => (
              <Post key={post.postId} post={post} id={post.postId} />
            ))}
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
