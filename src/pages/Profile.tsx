import { useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { FaRegHeart } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import { HiOutlinePencil } from 'react-icons/hi2';

import { auth } from '@/api/firebaseApp';
import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import ProfileEditModal from '@/components/profile/ProfileEditModal';

import ProfilePost from '../components/profile/ProfileInfo';

const ProfilePage: React.FC = () => {
  const tabs = [
    { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
    { id: 'pli', label: '플리', icon: <FiPlay /> },
    { id: 'likes', label: '좋아요', icon: <FaRegHeart /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const profileUserId = currentUserId || '';

  return (
    <>
      <LogoHeader showSettings onSettingsClick={() => {}} />
      {currentUserId && <ProfilePost profileUserId={profileUserId} onEditClick={handleEditClick} />}
      <div>
        <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          <TabContent id="post" activeTabId={activeTab}>
            <div>포스트 내용</div>
          </TabContent>
          <TabContent id="pli" activeTabId={activeTab}>
            <div>플리 내용</div>
          </TabContent>
          <TabContent id="likes" activeTabId={activeTab}>
            <div>좋아요 내용</div>
          </TabContent>
        </TabMenu>
      </div>
      <ProfileEditModal isOpen={isEditModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ProfilePage;
