import { useCallback, useState, useMemo } from 'react';

import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { UserData } from '@/types/profile';

const FollowPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { userData, followingUsers, followerUsers, toggleFollow, refetchUserData, isFollowing } =
    useUserData(userId || null);
  const [activeTab, setActiveTab] = useState('following');
  const currentUser = useAuth();

  const handleFollowToggle = useCallback(
    async (targetUserId: string) => {
      if (currentUser?.uid) {
        try {
          console.log('Toggling follow for:', targetUserId);
          await toggleFollow(currentUser.uid, targetUserId);
          console.log('Follow toggled successfully');
          await refetchUserData();
        } catch (error) {
          console.error('Failed to toggle follow status:', error);
        }
      }
    },
    [currentUser, toggleFollow],
  );

  const handleUserClick = useCallback(
    (userId: string) => {
      navigate(`/profile/${userId}`);
    },
    [navigate],
  );

  const renderUserList = (users: UserData[]) => {
    console.log('Rendering user list:', users);
    return users.map((user) => {
      console.log('Rendering user:', user);
      return (
        <div key={user.userId} css={userItemStyle}>
          <UserInfo
            name={user.displayName}
            url={user.photoURL}
            imageSize={'large'}
            additionalInfo={`팔로워 ${user.followers?.length || 0}명`}
            userId={user.userId}
            showFollowButton={currentUser && currentUser.userId !== user.userId}
            isFollowing={isFollowing(user.userId)}
            onFollowToggle={() => handleFollowToggle(user.userId)}
            onClick={() => handleUserClick(user.userId)}
          />
        </div>
      );
    });
  };

  const tabs = useMemo(
    () => [
      { id: 'following', label: `팔로잉 ${followingUsers.length}` },
      { id: 'followers', label: `팔로워 ${followerUsers.length}` },
    ],
    [followingUsers.length, followerUsers.length],
  );

  return (
    <>
      <BackHeader title={userData?.displayName} />
      <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
        <TabContent id="following" activeTabId={activeTab}>
          {renderUserList(followingUsers)}
        </TabContent>
        <TabContent id="followers" activeTabId={activeTab}>
          {renderUserList(followerUsers)}
        </TabContent>
      </TabMenu>
    </>
  );
};

const userItemStyle = css`
  margin-bottom: 16px;
  cursor: pointer;
`;

export default FollowPage;
