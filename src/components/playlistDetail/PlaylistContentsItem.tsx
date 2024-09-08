import { useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiOutlineEllipsisVertical,
  HiOutlineBars2,
  HiOutlineBookmark,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { PATH } from '@/constants/path';
import { useRemoveVideoFromPlaylist } from '@/hooks/useRemoveVideoFromPlaylist';
import { useYouTubeVideoData } from '@/hooks/useYouTubeVideoData';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';
import { formatRelativeDate } from '@/utils/date';

interface PlaylistContentItemProps {
  video: VideoModel;
  isDraggable?: boolean;
  isSelected?: boolean;
  onVideoSelect?: (videoId: string) => void;
  customStyle?: SerializedStyles;
}

const PlaylistContentsItem: React.FC<PlaylistContentItemProps> = ({
  video,
  isSelected = false,
  onVideoSelect = () => {},
  isDraggable = false,
  customStyle,
}) => {
  const playlistId = useParams<{ id: string }>().id || '';
  const { data: videoData, isLoading, isError } = useYouTubeVideoData(video.videoId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const removeVideoMutation = useRemoveVideoFromPlaylist();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onClickOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleOpenModal();
  };

  const handleClick = () => {
    if (!isDraggable) {
      onVideoSelect(video.videoId);
    }
  };

  const handleRemoveVideo = () => {
    removeVideoMutation.mutate({
      playlistId,
      video: {
        videoId: video.videoId,
        thumbnailUrl: video.thumbnailUrl,
        videoUrl: video.videoUrl,
      },
    });
    handleCloseModal();
  };

  if (isLoading) {
    return <li>Loading...</li>;
  }

  if (isError || !videoData) {
    return <li>Error loading video data</li>;
  }
  return (
    <>
      <div
        css={[playlistItemStyle, isSelected && selectedStyle, customStyle]}
        onClick={handleClick}
        data-testid="playlist-select-video-item"
      >
        {isDraggable && <HiOutlineBars2 className="drag-bar" />}
        <div className="video-container">
          <VideoThumbnail url={video.thumbnailUrl} isPublic={true} customStyle={thumbnailStyle} />
          <div className="video-info">
            <a href={`${isDraggable ? video.videoUrl : 'javascript:void(0)'}`}>
              <div className="info-container">
                <h2 data-testid="video-title">{videoData.title}</h2>
                <span>{videoData.creator}</span>
                <span>
                  조회수 {videoData.views} · {formatRelativeDate(videoData.uploadDate)}
                </span>
              </div>
            </a>
            <button onClick={onClickOption} className="ellipsis-button">
              <HiOutlineEllipsisVertical aria-label="플리에 추가/삭제" />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={null}>
        <div css={modalContentContainer}>
          <div
            onClick={() => {
              handleCloseModal();
              navigate(`${PATH.ADD_VIDEO_SELECT_PLI}/${video.videoId}`);
            }}
          >
            <div className="icon-wrapper">
              <HiOutlineBookmark />
            </div>
            플리에 추가하기
          </div>
          {isDraggable && (
            <div onClick={handleRemoveVideo}>
              <div className="icon-wrapper">
                <HiOutlineTrash />
              </div>
              플리에서 삭제하기
            </div>
          )}
        </div>
      </Modal>
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

    .ellipsis-button {
      position: absolute;
      top: 5px;
      right: 0;
      background-color: transparent;
      border: none;
    }

    svg {
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

      .ellipsis-button {
        top: 10px;
      }
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

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;

    .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: ${theme.colors.lightestGray};
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;

      svg {
        height: 18px;
        width: 18px;
      }
    }
  }
`;

export default PlaylistContentsItem;
