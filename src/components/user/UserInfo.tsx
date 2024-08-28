import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

interface UserInfoProps {
  name: string;
  url: string;
  additionalInfo?: string | null;
  imageSize?: 'default' | 'large';
  customStyle?: SerializedStyles;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  url,
  additionalInfo = null,
  imageSize = 'default',
  customStyle,
}) => {
  return (
    <div css={[userInfoStyle(imageSize), customStyle]}>
      <img src={url} alt={name} />
      <div className="name-container">
        <span>{name}</span>
        {additionalInfo && <p>{additionalInfo}</p>}
      </div>
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
`;

export default UserInfo;
