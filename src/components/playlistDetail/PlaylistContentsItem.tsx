import { css } from '@emotion/react';
import { HiOutlineEllipsisVertical, HiOutlineBars2 } from 'react-icons/hi2';

import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';
import { formatRelativeDate } from '@/utils/date';

interface PlaylistContentItemProps {
  video: VideoModel;
}

const PlaylistContentsItem: React.FC<PlaylistContentItemProps> = ({ video }) => {
  const { title, videoUrl, thumbnailUrl, creator, uploadDate, views } = video;

  const onClickOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <li css={playlistItemStyle}>
      <HiOutlineBars2 className="drag-bar" />
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <VideoThumbnail url={thumbnailUrl} isPublic={true} customStyle={thumbnailStyle} />
        <div className="video-info">
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
        </div>
      </a>
    </li>
  );
};

const playlistItemStyle = css`
  position: relative;

  a {
    position: relative;
    display: flex;
    gap: 12px;
  }

  .drag-bar {
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: ${theme.colors.darkGray};
    stroke-width: 1.7;
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

const thumbnailStyle = css`
  flex: 1 1 50%;
  margin-left: 4px;

  @media screen and (min-width: ${theme.width.max}) {
    flex: 1 1 40%;
  }
`;

export default PlaylistContentsItem;
