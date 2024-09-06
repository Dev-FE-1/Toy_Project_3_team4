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
import Post from '@/components/post/Post';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useAddPlaylist } from '@/hooks/usePostPlaylist';
import { useUserData } from '@/hooks/useUserData';
import { PostModel } from '@/types/post';
import { dummyPosts } from '@/utils/dummy';

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
  const [filteredPosts, setFilteredPosts] = useState<PostModel[]>([]);
  const { data: playlists, isLoading: playlistsLoading } = useUserPlaylists();
  const addPlaylistMutation = useAddPlaylist();

  useEffect(() => {
    if (currentUser && userData) {
      setIsFollowing(userData.followers?.includes(currentUser.uid) || false);
    }
  }, [currentUser, userData]);

  useEffect(() => {
    if (userId) {
      const profilePosts = dummyPosts.filter((post) => post.userId === userId);
      setFilteredPosts(profilePosts);
    }
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
            {filteredPosts.map((post) => (
              <Post key={post.postId} post={post} id={post.postId} />
            ))}
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
