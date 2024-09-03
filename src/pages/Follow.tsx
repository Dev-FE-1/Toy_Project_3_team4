import { useState } from 'react';

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import UserInfo from '@/components/user/UserInfo';
import { useUserData } from '@/hooks/useUserData';
import { UserData } from '@/types/profile';

const FollowPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { userData, followingUsers, followerUsers } = useUserData(userId || null);
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { id: 'following', label: `팔로잉 (${followingUsers.length})` },
    { id: 'followers', label: `팔로워 (${followerUsers.length})` },
  ];

  const renderUserList = (users: UserData[]) => {
    return users.map((user) => (
      <UserInfo
        key={user.uid}
        name={user.displayName}
        url={user.photoURL}
        additionalInfo={`팔로워 ${user.followers?.length || 0}`}
        customStyle={followUserList}
      />
    ));
  };

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

const followUserList = css`
  margin-bottom: 16px;
`;

export default FollowPage;
