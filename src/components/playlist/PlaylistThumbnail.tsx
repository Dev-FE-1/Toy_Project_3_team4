import { css } from '@emotion/react';

import PrivateLabel from '@/components/playlist/PrivateLabel';
import theme from '@/styles/theme';

interface PlaylistThumbnailProps {
  url?: string | null;
  isPublic?: boolean;
}

const PlaylistThumbnail: React.FC<PlaylistThumbnailProps> = ({ url = null, isPublic = true }) => {
  return (
    <div css={thumbnailStyle(url)}>
      <div className="image-container">
        <div className="image" />
      </div>
      {!isPublic && <PrivateLabel />}
    </div>
  );
};

const thumbnailStyle = (url: string | null) => css`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9
  border-radius: 12px;

  .image-container {
    overflow: hidden;

    ::before {
      content: '';
      position: absolute;
      display: block;
      top: -4px;
      left: 50%;
      width: 94%;
      height: 100%;
      border: 1px solid ${theme.colors.lightGray};
      border-radius: 12px;
      background-color: ${url ? theme.colors.darkestGray : theme.colors.lightestGray};
      transform: translateX(-50%);
    }
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 12px;
    background-color: ${theme.colors.bgGray};

    ${url &&
    css`
      background-image: url(${url});
      background-size: cover;
      background-position: center;
    `}
  }
`;

export default PlaylistThumbnail;
