import { css, SerializedStyles } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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
  url: string;
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
        <img src={url} alt={name} />
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

    img {
      width: ${imageSizes[imageSize]};
      height: ${imageSizes[imageSize]};
      border-radius: 50%;
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
