// import { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import TabContent from "@/components/common/tabs/TabContent";
// import TabMenu from "@/components/common/tabs/TabMenu";
// import BackHeader from "@/components/layout/header/BackHeader";
// import { useUserData } from "@/hooks/useUserData";
// import UserInfo from "@/components/user/UserInfo";
// import { UserData } from "@/types/profile";
// import { css } from "@emotion/react";

// const FollowPage = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const { userData, getFollowingUsers, getFollowerUsers } = useUserData(userId || null);
//   const [activeTab, setActiveTab] = useState('following');
//   const [tabs, setTabs] = useState([
//     { id: 'following', label: '팔로잉 (0)' },
//     { id: 'followers', label: '팔로워 (0)' },
//   ]);
//   const [followingUsers, setFollowingUsers] = useState<UserData[]>([]);
//   const [followerUsers, setFollowerUsers] = useState<UserData[]>([]);

//   useEffect(() => {
//     if (userData) {
//       setTabs([
//         { id: 'following', label: `팔로잉 (${userData.following?.length || 0})` },
//         { id: 'followers', label: `팔로워 (${userData.followers?.length || 0})` },
//       ]);
//     }
//   }, [userData]);

//   const fetchUsers = useCallback(async () => {
//     if (userData) {
//       const following = await getFollowingUsers();
//       const followers = await getFollowerUsers();
//       setFollowingUsers(following);
//       setFollowerUsers(followers);
//     }
//   }, [userData, getFollowingUsers, getFollowerUsers]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const renderUserList = (users: UserData[]) => {
//     return users.map((user) => (
//       <UserInfo
//         key={user.uid}
//         name={user.displayName}
//         url={user.photoURL}
//         additionalInfo={`팔로워 ${user.followers?.length || 0}`}
//         customStyle={followUserList}
//       />
//     ));
//   };

//   return (
//     <>
//       <BackHeader title={userData?.displayName} />
//       <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
//         <TabContent id="following" activeTabId={activeTab}>
//           {renderUserList(followingUsers)}
//         </TabContent>
//         <TabContent id="followers" activeTabId={activeTab}>
//           {renderUserList(followerUsers)}
//         </TabContent>
//       </TabMenu>
//     </>
//   );
// };

// const followUserList = css`
//   margin-bottom: 16px;
// `

// export default FollowPage;

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
  // const [followingUsers, setFollowingUsers] = useState<UserData[]>([]);
  // const [followerUsers, setFollowerUsers] = useState<UserData[]>([]);

  const tabs = [
    { id: 'following', label: `팔로잉 (${followingUsers.length})` },
    { id: 'followers', label: `팔로워 (${followerUsers.length})` },
  ];

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //   console.log("Fetching users...");
  //     if (userData) {
  //       console.log("userData available:", userData);
  //       try {
  //         const following = await getFollowingUsers();
  //         const followers = await getFollowerUsers();
  //         setFollowingUsers(following);
  //         setFollowerUsers(followers);
  //       } catch (error) {
  //         console.log("Error fetching users:", error);
  //       }
  //     }
  //   };
  //   fetchUsers();
  // }, [userData, getFollowingUsers, getFollowerUsers]);

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
