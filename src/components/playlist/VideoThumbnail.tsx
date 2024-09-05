import { css, SerializedStyles } from '@emotion/react';

import PrivateLabel from '@/components/playlist/PrivateLabel';
import theme from '@/styles/theme';

type URLType = string | null;
type ThumbnailType = 'default' | 'stack';

interface VideoThumbnailProps {
  url: URLType;
  isPublic: boolean;
  type?: ThumbnailType;
  customStyle?: SerializedStyles;
  customLabelStyle?: SerializedStyles;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  url = null,
  isPublic = true,
  type = 'default',
  customStyle,
  customLabelStyle,
}) => {
  return (
    <div css={[thumbnailStyle(url), customStyle]}>
      {type === 'stack' && <div className="stack" />}
      <div className="image-container">{url && <img src={url} alt="" />}</div>
      {!isPublic && <PrivateLabel customStyle={customLabelStyle} />}
    </div>
  );
};

const thumbnailStyle = (url: URLType) => css`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;

  .stack {
    position: absolute;
    top: -3px;
    left: 3%;
    width: 94%;
    height: 100%;
    border-radius: 12px;
    background-color: ${url ? theme.colors.darkestGray : theme.colors.lightGray};
  }

  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: ${theme.colors.bgGray};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 12px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default VideoThumbnail;
