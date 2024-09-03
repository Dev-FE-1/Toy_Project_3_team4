import { forwardRef } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlineEllipsisVertical, HiOutlineBars2 } from 'react-icons/hi2';

import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';
import { formatRelativeDate } from '@/utils/date';

interface PlaylistContentItemProps {
  video: VideoModel;
  isDraggable?: boolean;
  isSelected: boolean;
  onVideoSelect: (videoId: string) => void;
  customStyle?: SerializedStyles;
}

const PlaylistContentsItem = forwardRef<HTMLLIElement, PlaylistContentItemProps>(
  ({ video, isSelected, onVideoSelect, isDraggable = false, customStyle }, ref) => {
    const { title, thumbnailUrl, creator, uploadDate, views } = video;

    const onClickOption = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleClick = () => {
      if (!isDraggable) {
        onVideoSelect(video.videoId);
      }
    };

    return (
      <li
        css={[playlistItemStyle, isSelected && selectedStyle, customStyle]}
        ref={ref}
        onClick={handleClick}
      >
        {isDraggable && <HiOutlineBars2 className="drag-bar" />}
        <div className="video-container">
          <VideoThumbnail url={thumbnailUrl} isPublic={true} customStyle={thumbnailStyle} />
          <div className="video-info">
            <a href={`${isDraggable ? video.videoUrl : 'javascript:void(0)'}`}>
              <div className="info-container">
                <h2>{title}</h2>
                <span>{creator}</span>
                <span>
                  조회수 {views} · {formatRelativeDate(uploadDate)}
                </span>
              </div>
              <button onClick={onClickOption}>
                <HiOutlineEllipsisVertical aria-label="플리에 추가/삭제" />
              </button>
            </a>
          </div>
        </div>
      </li>
    );
  },
);

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

    button {
      height: fit-content;
      background-color: transparent;
    }

    svg {
      flex-shrink: 0;
      margin-top: 2px;
      font-size: 20px;
    }
  }

  .info-container {
    display: flex;
    min-width: 0;
    flex-direction: column;

    h2 {
      ${textEllipsis(3)}
      max-height: 4.2em;
      padding-bottom: 4px;
      font-size: ${theme.fontSizes.small};
      font-weight: normal;
    }

    span {
      font-size: ${theme.fontSizes.micro};
      color: ${theme.colors.darkGray};
      ${textEllipsis(1)}
    }
  }

  @media screen and (min-width: ${theme.width.large}) {
    .video-info {
      flex: 1 1 60%;
      padding-top: 8px;

      svg {
        font-size: 24px;
        margin-top: -2px;
      }
    }

    .info-container {
      h2 {
        font-size: ${theme.fontSizes.base};
      }

      span {
        font-size: ${theme.fontSizes.small};
      }
    }
  }
`;

const selectedStyle = css`
  background-color: #e0e0e0;
  border-radius: 8px;
  transition: background-color 0.3s ease;
`;

const thumbnailStyle = css`
  flex: 1 1 50%;
  margin-left: 4px;

  @media screen and (min-width: ${theme.width.max}) {
    flex: 1 1 40%;
  }
`;

export default PlaylistContentsItem;
