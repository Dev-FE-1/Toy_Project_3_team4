import { useState } from 'react';

import { css, Theme } from '@emotion/react';

import FitButton from '@/components/common/buttons/FitButton';
import { useAuth } from '@/hooks/useAuth';
import { UserData } from '@/types/profile';

interface ProfileInfoProps {
  profileUserId: string;
  userData: UserData;
  onEditClick?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileUserId, userData, onEditClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = useAuth();

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? '언팔로우' : '팔로우');
  };

  const isOwnProfile = currentUser?.uid === profileUserId;

  return (
    <>
      <div css={profileContainerStyle}>
        <div css={ProfileWrapStyle}>
          <div css={profileImageStyle}>
            <img src={userData.photoURL} alt="Profile" />
          </div>
          <div css={profileInfoStyle}>
            <p css={usernameStyle}>{userData.displayName}</p>
            <div css={followInfoStyle}>
              <div>
                <span css={followCountStyle}>12</span>
                <span css={followLabelStyle}>팔로잉</span>
              </div>
              <div>
                <span css={followCountStyle}>12</span>
                <span css={followLabelStyle}>팔로워</span>
              </div>
            </div>
          </div>
          {isOwnProfile ? (
            <FitButton styleType="secondary" onClick={onEditClick}>
              프로필 수정
            </FitButton>
          ) : (
            <FitButton
              styleType={isFollowing ? 'secondary' : 'primary'}
              onClick={handleFollowToggle}
            >
              {isFollowing ? '팔로잉' : '팔로우'}
            </FitButton>
          )}
        </div>
        <div css={introduceStyle}>
          <p>{userData.bio}</p>
        </div>
      </div>
    </>
  );
};

const profileContainerStyle = css`
  padding: 20px 16px 22px 16px;
`;

const ProfileWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const profileImageStyle = css`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const profileInfoStyle = css`
  flex: 1;
`;

const usernameStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  margin-bottom: 8px;
`;

const followInfoStyle = css`
  display: flex;
  gap: 20px;
  // margin-bottom: 8px;
`;

const followCountStyle = (theme: Theme) => css`
  font-weight: 700;
  font-size: ${theme.fontSizes.small};
  margin-right: 5px;
`;

const followLabelStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
`;

const introduceStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.micro};
`;

export default ProfileInfo;
