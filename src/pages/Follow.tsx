import { useCallback, useState } from 'react';

import { css } from '@emotion/react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { UserData } from '@/types/profile';

const FollowPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userData, followingUsers, followerUsers, toggleFollow, isFollowing } = useUserData(
    userId || null,
  );
  const currentUser = useAuth();

  const initialActiveTab = searchParams.get('active') || 'following';
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleFollowToggle = useCallback(
    async (targetUserId: string) => {
      if (currentUser?.uid) {
        try {
          await toggleFollow(currentUser.uid, targetUserId);
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
    return users.map((user) => (
      <div key={user.userId} css={userItemStyle}>
        <UserInfo
          name={user.displayName}
          url={user.photoURL}
          imageSize={'large'}
          additionalInfo={`팔로워 ${user.followers?.length || 0}명`}
          userId={user.userId}
          showFollowButton={!!(currentUser && currentUser.uid !== user.userId)}
          isFollowing={isFollowing(user.userId)}
          onFollowToggle={() => handleFollowToggle(user.userId)}
          onClick={() => handleUserClick(user.userId)}
        />
      </div>
    ));
  };

  const tabs = [
    { id: 'following', label: `팔로잉 ${userData?.following?.length || 0}` },
    { id: 'followers', label: `팔로워 ${userData?.followers?.length || 0}` },
  ];

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

export const userItemStyle = css`
  margin-bottom: 16px;
  cursor: pointer;
`;

export default FollowPage;
