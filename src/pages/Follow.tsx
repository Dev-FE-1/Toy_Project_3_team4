import { useCallback, useState, useEffect } from 'react';

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
  const { userData, followingUsers, followerUsers, toggleFollow, refetchUserData } = useUserData(
    userId || null,
  );
  const [activeTab, setActiveTab] = useState('following');
  const currentUser = useAuth();
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialStatus: { [key: string]: boolean } = {};
    followingUsers.forEach((user) => {
      initialStatus[user.userId] = true;
    });
    setFollowStatus(initialStatus);
    console.log('Initial follow status:', initialStatus); // 로그 추가
  }, [followingUsers]);

  const handleFollowToggle = useCallback(
    async (targetUserId: string) => {
      if (currentUser?.uid) {
        try {
          await toggleFollow(currentUser.uid, targetUserId);

          setFollowStatus((prev) => {
            const newStatus = { ...prev, [targetUserId]: !prev[targetUserId] };
            console.log('Updated follow status:', newStatus); // 로그 추가
            return newStatus;
          });

          await refetchUserData();
        } catch (error) {
          console.error('Failed to toggle follow status:', error);
        }
      }
    },
    [currentUser, toggleFollow, refetchUserData],
  );

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`); // Navigate to the user's profile page
  };

  const renderUserList = useCallback(
    (users: UserData[]) => {
      return users.map((user) => {
        console.log('Rendering user:', user);
        console.log('Current user:', currentUser);
        console.log('Show follow button:', currentUser && currentUser.userId !== user.userId);
        console.log('Is following:', followStatus[user.userId]);

        return (
          <div key={user.uid} css={userItemStyle}>
            <UserInfo
              key={`info-${user.uid}`}
              name={user.displayName}
              url={user.photoURL}
              imageSize={'large'}
              additionalInfo={`팔로워 ${user.followers?.length || 0}명`}
              userId={user.userId}
              showFollowButton={currentUser && currentUser.userId !== user.userId}
              isFollowing={followStatus[user.userId] || false}
              onFollowToggle={handleFollowToggle}
              onClick={() => handleUserClick(user.userId)}
            />
          </div>
        );
      });
    },
    [currentUser, handleFollowToggle, followStatus],
  );

  const tabs = [
    { id: 'following', label: `팔로잉 ${followingUsers.length}` },
    { id: 'followers', label: `팔로워 ${followerUsers.length}` },
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

const userItemStyle = css`
  margin-bottom: 16px;
  cursor: pointer;
`;

export default FollowPage;
