import { useState } from 'react';

import { FaRegNewspaper, FaRegHeart } from 'react-icons/fa';
import { MdPlaylistAdd } from 'react-icons/md';

import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';

const ProfilePage = () => {
  const tabs = [
    { id: 'tab1', label: '포스트', icon: <FaRegNewspaper /> },
    { id: 'tab2', label: '플리', icon: <MdPlaylistAdd /> },
    { id: 'tab3', label: '좋아요', icon: <FaRegHeart /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <div>포스트</div>;
      case 'tab2':
        return <div>플리</div>;
      case 'tab3':
        return <div>좋아요</div>;
      default:
        return <div>포스트</div>;
    }
  };

  return (
    <>
      <LogoHeader showSettings onSettingsClick={() => {}} />
      <div>
        <TabMenu
          tabs={tabs}
          onTabChange={handleTabChange}
          defaultTabId={tabs[0].id}
          // customStyle={tabMenuCustomStyle}
        />

        <div>{renderTabContent()}</div>
      </div>
    </>
  );
};

export default ProfilePage;
