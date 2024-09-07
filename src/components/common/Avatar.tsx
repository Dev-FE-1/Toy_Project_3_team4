import { css, SerializedStyles } from '@emotion/react';

import defaultImage from '@/assets/images/default-avatar.svg';
import theme from '@/styles/theme';
import { ImageSizeType } from '@/types/avatar';

const imageSizes: Record<ImageSizeType, string> = {
  default: '24px',
  medium: '32px',
  large: '42px',
  extraLarge: '70px',
};

interface AvatarProps {
  size?: ImageSizeType;
  url?: string;
  customStyle?: SerializedStyles;
}

const Avatar: React.FC<AvatarProps> = ({ size = 'default', url, customStyle }) => {
  return (
    <div css={[profileImageStyle(size), customStyle]}>
      <img src={url || defaultImage} alt="프로필" />
    </div>
  );
};

const profileImageStyle = (imageSize: ImageSizeType) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${imageSizes[imageSize]};
  height: ${imageSizes[imageSize]};
  background-color: ${theme.colors.lightestGray};
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatar;
