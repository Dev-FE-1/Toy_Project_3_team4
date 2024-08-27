import { useState } from 'react';

import { FaRegHeart } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import { HiOutlinePencil } from 'react-icons/hi2';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';

const ProfilePage = () => {
  const tabs = [
    { id: 'tab1', label: '포스트', icon: <HiOutlinePencil /> },
    { id: 'tab2', label: '플리', icon: <FiPlay /> },
    { id: 'tab3', label: '좋아요', icon: <FaRegHeart /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <LogoHeader showSettings onSettingsClick={() => {}} />
      <div>
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="tab1" activeTabId={activeTab}>
            <div>포스트 내용</div>
          </TabContent>
          <TabContent id="tab2" activeTabId={activeTab}>
            <div>플리 내용</div>
          </TabContent>
          <TabContent id="tab3" activeTabId={activeTab}>
            <div>좋아요 내용</div>
          </TabContent>
        </TabMenu>
      </div>
    </>
  );
};

export default ProfilePage;
