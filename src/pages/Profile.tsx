import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { FaRegHeart } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { getPostsByUserId, getPostsFilterdLikes } from '@/api/fetchPosts';
import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import Post from '@/components/post/Post';
import { PATH } from '@/constants/path';
import { useAddPlaylist } from '@/hooks/useAddPlaylist';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useUserData } from '@/hooks/useUserData';
import { PostModel } from '@/types/post';

import ProfileInfo from '../components/profile/ProfileInfo';

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
  const [userPosts, setUserPosts] = useState<PostModel[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostModel[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingLikedPosts, setLoadingLikedPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: playlists, isLoading: playlistsLoading } = useUserPlaylists();
  const addPlaylistMutation = useAddPlaylist();

  useEffect(() => {
    if (currentUser && userData) {
      setIsFollowing(userData.followers?.includes(currentUser.uid) || false);
    }
  }, [currentUser, userData]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (userId) {
        try {
          // setLoadingPosts(true);
          // const profilePosts = await getPostsByUserId({ userId });
          // setFilteredPosts(profilePosts);
          setLoadingPosts(true);
          const posts = await getPostsByUserId({ userId });
          setUserPosts(posts);
        } catch (err) {
          setError('Failed to load posts');
          console.error(err);
        } finally {
          setLoadingPosts(false);
        }
      }
    };
    const fetchLikedPosts = async () => {
      if (userId) {
        try {
          setLoadingLikedPosts(true);
          const posts = await getPostsFilterdLikes({ userId });
          setLikedPosts(posts);
        } catch (err) {
          setError('Failed to load liked posts');
          console.error(err);
        } finally {
          setLoadingLikedPosts(false);
        }
      }
    };

    fetchUserPosts();
    fetchLikedPosts();
  }, [userId]);

  const handleSettingsClick = () => {
    navigate(PATH.SETTINGS);
  };

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

  const handleAddPlaylist = (title: string, isPublic: boolean) => {
    addPlaylistMutation.mutate({ title, isPublic });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const isOwnProfile = currentUser?.uid === userId;

  return (
    <>
      <LogoHeader showSettings onSettingsClick={handleSettingsClick} />
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
            {loadingPosts ? (
              <div>Loading posts...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              userPosts.map((post) => <Post key={post.postId} post={post} id={post.postId} />)
            )}
          </TabContent>
          <TabContent id="pli" activeTabId={activeTab}>
            <AddPlaylistButton
              customStyle={addPlaylistButtonStyle}
              onAddPlaylist={handleAddPlaylist}
            />
            {playlistsLoading ? (
              <div>Loading playlists...</div>
            ) : (
              <Playlists playlists={playlists || []} />
            )}
          </TabContent>
          <TabContent id="likes" activeTabId={activeTab}>
            <div>좋아요 내용</div>
            {loadingLikedPosts ? (
              <div>Loading liked posts...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              likedPosts.map((post) => <Post key={post.postId} post={post} id={post.postId} />)
            )}
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
