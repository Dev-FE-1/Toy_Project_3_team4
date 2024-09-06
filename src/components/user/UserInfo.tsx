import { css, SerializedStyles } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/images/default-avatar.svg';
import FitButton from '@/components/common/buttons/FitButton';
import theme from '@/styles/theme';

type ImageSizeType = 'default' | 'medium' | 'large';

const imageSizes: Record<ImageSizeType, string> = {
  default: '24px',
  medium: '32px',
  large: '42px',
};
interface UserInfoProps {
  name: string;
  url?: string;
  additionalInfo?: string | null;
  imageSize?: ImageSizeType;
  customStyle?: SerializedStyles;
  userId?: string;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: (userId: string) => void;
  onClick?: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  url,
  additionalInfo = null,
  imageSize = 'default',
  customStyle,
  userId,
  showFollowButton = false,
  isFollowing = false,
  onFollowToggle,
  onClick,
}) => {
  const navigate = useNavigate();
  const onClickUserName = () => navigate(`/profile/${userId}`);

  return (
    <div css={[userInfoStyle(imageSize), customStyle]}>
      <div className="info-container" onClick={onClick || onClickUserName}>
        <div className="image-container">
          {url ? (
            <img src={url} alt="Profile" />
          ) : (
            <img src={defaultImage} alt="" className="image-placeholder" />
          )}
        </div>
        <div className="name-container">
          <span>{name}</span>
          {additionalInfo && <p>{additionalInfo}</p>}
        </div>
      </div>
      {showFollowButton && userId && onFollowToggle && (
        <FitButton
          styleType={isFollowing ? 'secondary' : 'primary'}
          onClick={() => {
            onFollowToggle(userId);
          }}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </FitButton>
      )}
    </div>
  );
};

const userInfoStyle = (imageSize: ImageSizeType) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${imageSize === 'default' || imageSize === 'medium' ? '8px' : '12px'};

  .info-container {
    display: flex;
    align-items: center;
    gap: ${imageSize === 'default' || imageSize === 'medium' ? '8px' : '12px'};
    padding: 0;
    cursor: pointer;

    .image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${imageSizes[imageSize]};
      height: ${imageSizes[imageSize]};
      background-color: ${theme.colors.lightestGray};
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &.image-placeholder {
          width: 60%;
          height: 60%;
        }
      }
    }

    .name-container {
      display: flex;
      flex-direction: column;
      line-height: 100%;
      font-weight: 500;

      span {
        font-size: ${theme.fontSizes.small};
      }

      p {
        font-size: ${theme.fontSizes.micro};
        color: ${theme.colors.darkGray};
      }
    }
  }

  @media screen and (min-width: ${theme.width.max}) {
    .name-container {
      span {
        font-size: ${theme.fontSizes.base};
      }

      p {
        font-size: ${theme.fontSizes.small};
      }
    }
  }
`;

export default UserInfo;
