import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePencil, HiOutlinePlay, HiOutlineHeart } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/loading/Spinner';
import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import EmptyMessage from '@/components/EmptyMessage';
import LogoHeader from '@/components/layout/header/LogoHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import Post from '@/components/post/Post';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useLikedPosts } from '@/hooks/useLikedPosts';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useAddPlaylist } from '@/hooks/usePostPlaylist';
import { useUserData } from '@/hooks/useUserData';
import { useUserPosts } from '@/hooks/useUserPosts';

import ProfileInfo from '../components/profile/ProfileInfo';

const tabs = [
  { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
  { id: 'pli', label: '플리', icon: <HiOutlinePlay /> },
  { id: 'likes', label: '좋아요', icon: <HiOutlineHeart /> },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentUser = useAuth();
  const { userData, toggleFollow, refetchUserData } = useUserData(
    userId || currentUser?.uid || null,
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: playlists, isLoading: playlistsLoading } = useUserPlaylists(userId);
  const { userPosts, loadingPosts, error: userPostsError } = useUserPosts(userId || '');
  const { likedPosts, loadingLikedPosts, error: likedPostsError } = useLikedPosts(userId || '');
  const addPlaylistMutation = useAddPlaylist();

  useEffect(() => {
    if (currentUser && userData) {
      setIsFollowing(userData.followers?.includes(currentUser.uid) || false);
    }
  }, [currentUser, userData]);

  const handleSettingsClick = () => {
    navigate(PATH.SETTINGS);
  };

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
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
    return (
      <div>
        <Spinner />
      </div>
    );
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
        refetchUserData={refetchUserData}
      />
      <div>
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="post" activeTabId={activeTab}>
            {loadingPosts ? (
              <div css={spinnerContainerStyle}>
                <Spinner customStyle={spinnerStyle} />
              </div>
            ) : userPostsError ? (
              <div>{userPostsError.toString()}</div>
            ) : (
              userPosts.map((post) => <Post key={post.postId} post={post} id={post.postId} />)
            )}
            {!loadingPosts && userPosts.length === 0 && (
              <EmptyMessage Icon={HiOutlinePencil}>아직 포스트가 없습니다</EmptyMessage>
            )}
          </TabContent>
          <TabContent id="pli" activeTabId={activeTab}>
            {isOwnProfile && (
              <AddPlaylistButton
                customStyle={addPlaylistButtonStyle}
                onAddPlaylist={handleAddPlaylist}
              />
            )}
            {playlistsLoading ? (
              <div css={spinnerContainerStyle}>
                <Spinner customStyle={spinnerStyle} />
              </div>
            ) : (
              <Playlists playlists={playlists || []} onPlaylistClick={handlePlaylistClick} />
            )}
            {!playlistsLoading &&
              (!playlists || playlists.filter((playlist) => playlist.isPublic).length === 0) &&
              currentUser?.uid !== userId && (
                <EmptyMessage Icon={HiOutlinePlay}>아직 공개된 플리가 없습니다</EmptyMessage>
              )}
          </TabContent>
          <TabContent id="likes" activeTabId={activeTab}>
            {loadingLikedPosts ? (
              <div css={spinnerContainerStyle}>
                <Spinner customStyle={spinnerStyle} />
              </div>
            ) : likedPostsError ? (
              <div>{likedPostsError.toString()}</div>
            ) : (
              likedPosts.map((post) => <Post key={post.postId} post={post} id={post.postId} />)
            )}
            {!loadingLikedPosts && likedPosts.length === 0 && (
              <EmptyMessage Icon={HiOutlineHeart}>아직 좋아요 한 포스트가 없습니다</EmptyMessage>
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

const spinnerContainerStyle = css`
  width: 100%;
`;

const spinnerStyle = css`
  margin: 48px auto;
`;

export default ProfilePage;
