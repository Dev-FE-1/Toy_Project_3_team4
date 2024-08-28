import { useState } from 'react';

import { FaRegHeart } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import { HiOutlinePencil } from 'react-icons/hi2';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import LogoHeader from '@/components/layout/header/LogoHeader';
import ProfileEditModal from '@/components/profile/ProfileEditModal';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';

import ProfileInfo from '../components/profile/ProfileInfo';

const tabs = [
  { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
  { id: 'pli', label: '플리', icon: <FiPlay /> },
  { id: 'likes', label: '좋아요', icon: <FaRegHeart /> },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const currentUser = useAuth();
  const { userData, updateUserData } = useUserData(currentUser?.uid || null);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  // const profileUserId = currentUserId || '';

  const handleSaveProfile = async (name: string, bio: string, photoURL: string) => {
    if (!currentUser) return;

    try {
      await updateUserData({
        displayName: name,
        bio,
        photoURL,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!currentUser || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LogoHeader showSettings onSettingsClick={() => {}} />
      <ProfileInfo
        profileUserId={currentUser.uid}
        userData={userData}
        onEditClick={handleEditClick}
      />
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
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        initialName={userData.displayName}
        initialBio={userData.bio}
        initialPhotoURL={userData.photoURL}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default ProfilePage;
