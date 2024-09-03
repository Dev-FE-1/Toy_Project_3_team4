import { css, SerializedStyles } from '@emotion/react';

import FitButton from '@/components/common/buttons/FitButton';
import theme from '@/styles/theme';

interface UserInfoProps {
  name: string;
  url: string;
  additionalInfo?: string | null;
  imageSize?: 'default' | 'large';
  customStyle?: SerializedStyles;
  userId?: string;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: (userId: string) => void;
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
}) => {
  console.log('UserInfo props:', { name, userId, showFollowButton, isFollowing });
  return (
    <div css={[userInfoStyle(imageSize), customStyle]}>
      <img src={url} alt={name} />
      <div className="name-container">
        <span>{name}</span>
        {additionalInfo && <p>{additionalInfo}</p>}
      </div>
      {showFollowButton && userId && onFollowToggle && (
        <FitButton
          styleType={isFollowing ? 'secondary' : 'primary'}
          onClick={() => {
            console.log('Follow button clicked for user:', userId);
            onFollowToggle(userId);
          }}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </FitButton>
      )}
    </div>
  );
};

const userInfoStyle = (imageSize: string) => css`
  display: flex;
  align-items: center;
  gap: ${imageSize === 'default' ? '8px' : '12px'};

  img {
    width: ${imageSize === 'default' ? '24px' : '42px'};
    height: ${imageSize === 'default' ? '24px' : '42px'};
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

  @media screen and (min-width: ${theme.width.max}) {
    img {
      width: ${imageSize === 'default' ? '32px' : '42px'};
      height: ${imageSize === 'default' ? '32px' : '42px'};
    }

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
