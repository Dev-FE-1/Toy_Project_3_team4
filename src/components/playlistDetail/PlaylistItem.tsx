import { ReactNode } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlineBars2 } from 'react-icons/hi2';

import Spinner from '@/components/common/loading/Spinner';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import theme from '@/styles/theme';
import { VideoModel, YoutubeVideoModel } from '@/types/playlist';

interface PlaylistItemProps {
  video: VideoModel;
  onClick?: () => void;
  videoData: YoutubeVideoModel | undefined;
  customStyle?: SerializedStyles;
  isLoading: boolean;
  isError: boolean;
  isDraggable?: boolean;
  children?: ReactNode;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  video,
  onClick = () => {},
  videoData,
  isLoading,
  isError,
  isDraggable = false,
  customStyle,
  children,
}) => {
  if (isLoading) {
    return (
      <div css={spinnerContainerStyle}>
        <Spinner />
      </div>
    );
  }

  if (isError || !videoData) {
    return <li>Error loading video data</li>;
  }

  return (
    <>
      <div css={[playlistItemStyle, customStyle]} onClick={onClick}>
        {isDraggable && <HiOutlineBars2 className="drag-bar" />}
        <div className="video-container">
          <VideoThumbnail url={video.thumbnailUrl} isPublic={true} customStyle={thumbnailStyle} />
          <div className="video-info">{children}</div>
        </div>
      </div>
    </>
  );
};

const playlistItemStyle = css`
  position: relative;
  padding: 8px 3px;

  .video-container {
    position: relative;
    display: flex;
    gap: 12px;
    cursor: pointer;
  }

  .drag-bar {
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: ${theme.colors.darkGray};
    stroke-width: 1.7;
    cursor: grab;
  }

  .video-info {
    display: flex;
    flex: 1 1 50%;
    gap: 4px;
    min-width: 0;
    padding-top: 4px;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: 20px;
  }

  @media screen and (min-width: ${theme.width.large}) {
    .video-info {
      flex: 1 1 60%;
      padding-top: 8px;
    }
  }
`;

const thumbnailStyle = css`
  flex: 1 1 50%;
  margin-left: 4px;

  @media screen and (min-width: ${theme.width.max}) {
    flex: 1 1 40%;
  }
`;

const spinnerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
`;

export default PlaylistItem;
