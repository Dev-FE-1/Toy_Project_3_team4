import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Avatar from '@/components/common/Avatar';
import FitButton from '@/components/common/buttons/FitButton';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';
import { UserData } from '@/types/profile';

interface ProfileInfoProps {
  profileUserId: string;
  userData: UserData;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onEditClick?: () => void;
  onFollowToggle: () => Promise<void>;
  refetchUserData: () => Promise<void>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profileUserId,
  userData,
  isOwnProfile,
  isFollowing: initialIsFollowing,
  onEditClick,
  onFollowToggle,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const currentUser = useAuth();

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollowToggle = async () => {
    if (currentUser && profileUserId) {
      try {
        await onFollowToggle();
        setIsFollowing(!isFollowing);
      } catch (error) {
        console.error('팔로우/언팔로우 실패:', error);
      }
    }
  };

  return (
    <>
      <div css={profileContainerStyle}>
        <div css={ProfileWrapStyle}>
          <Avatar url={userData.photoURL} size="extraLarge" />
          <div css={profileInfoStyle}>
            <p css={usernameStyle}>{userData.displayName}</p>
            <div css={followInfoStyle}>
              <Link
                to={`/profile/${profileUserId}/follow?following=${userData?.following?.length || 0}&followers=${userData?.followers?.length || 0}&active=following`}
              >
                <span css={followCountStyle}>{userData?.following?.length || 0}</span>
                <span css={followLabelStyle}>팔로잉</span>
              </Link>
              <Link
                to={`/profile/${profileUserId}/follow?following=${userData?.following?.length || 0}&followers=${userData?.followers?.length || 0}&active=followers`}
              >
                <span css={followCountStyle}>{userData?.followers?.length || 0}</span>
                <span css={followLabelStyle}>팔로워</span>
              </Link>
            </div>
          </div>
          {isOwnProfile ? (
            <FitButton styleType="secondary" onClick={onEditClick} customStyle={buttonStyle}>
              프로필 수정
            </FitButton>
          ) : (
            <FitButton
              styleType={isFollowing ? 'secondary' : 'primary'}
              onClick={handleFollowToggle}
              customStyle={buttonStyle}
            >
              {isFollowing ? '팔로잉' : '팔로우'}
            </FitButton>
          )}
        </div>
        {userData.bio && (
          <div css={introduceStyle}>
            <p>{userData.bio}</p>
          </div>
        )}
      </div>
    </>
  );
};

const profileContainerStyle = css`
  padding: 20px 0 28px;
`;

const ProfileWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const profileInfoStyle = css`
  flex: 1;
`;

const usernameStyle = css`
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  margin-bottom: 4px;
`;

const followInfoStyle = css`
  display: flex;
  gap: 16px;
`;

const followCountStyle = css`
  font-weight: 700;
  font-size: ${theme.fontSizes.small};
  margin-right: 4px;
`;

const followLabelStyle = css`
  font-size: ${theme.fontSizes.small};
`;

const introduceStyle = css`
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  color: ${theme.colors.darkestGray};
  padding: 0 8px;
  margin-top: 16px;
`;

const buttonStyle = css`
  font-weight: 600;
`;

export default ProfileInfo;
