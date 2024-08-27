import { css } from '@emotion/react';
import { HiOutlineLockClosed } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface PlaylistThumbnailProps {
  url?: string | null;
  isPrivate?: boolean;
}

const PlaylistThumbnail: React.FC<PlaylistThumbnailProps> = ({ url = null, isPrivate = false }) => {
  return (
    <div css={thumbnailStyle(url)}>
      <div className="image-container">
        <div className="image" />
      </div>
      {isPrivate && (
        <div className="private">
          <HiOutlineLockClosed />
        </div>
      )}
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

  .private {
    position: absolute;
    top: 6%;
    left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 0;
    padding-bottom: 15%;
    border-radius: 50%;
    background: rgba(30, 41, 59, 0.7);

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      color: ${theme.colors.white};
    }
  }
`;

export default PlaylistThumbnail;
