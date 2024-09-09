import { useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiOutlineEllipsisVertical,
  HiOutlineBars2,
  HiOutlineBookmark,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/loading/Spinner';
import OptionModal from '@/components/common/modals/OptionModal';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { PATH } from '@/constants/path';
import { useRemoveVideoFromPlaylist } from '@/hooks/useRemoveVideoFromPlaylist';
import { useYouTubeVideoData } from '@/hooks/useYouTubeVideoData';
import { useToastStore } from '@/stores/toastStore';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';
import { formatRelativeDate } from '@/utils/date';
import { formatVideoViewCount } from '@/utils/youtubeUtils';

interface PlaylistContentItemProps {
  video: VideoModel;
  isDraggable?: boolean;
  isSelected?: boolean;
  onVideoSelect?: (videoId: string) => void;
  customStyle?: SerializedStyles;
  selectPli?: boolean;
}

const PlaylistContentsItem: React.FC<PlaylistContentItemProps> = ({
  video,
  isSelected = false,
  onVideoSelect = () => {},
  isDraggable = false,
  customStyle,
  selectPli = false,
}) => {
  const playlistId = useParams<{ id: string }>().id || '';
  const { data: videoData, isLoading, isError } = useYouTubeVideoData(video.videoId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const removeVideoMutation = useRemoveVideoFromPlaylist();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleClick = () => {
    if (selectPli) {
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
    addToast('플레이리스트에서 동영상이 삭제되었습니다.');
  };

  const modalOptions = [
    {
      label: '플리에 추가하기',
      Icon: HiOutlineBookmark,
      onClick: () => {
        handleCloseModal();
        navigate(`${PATH.ADD_VIDEO_SELECT_PLI}/${video.videoId}`);
      },
    },
    {
      label: '플리에서 삭제하기',
      Icon: HiOutlineTrash,
      onClick: handleRemoveVideo,
    },
  ];

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
      <div
        css={[playlistItemStyle, isSelected && selectedStyle, customStyle]}
        onClick={handleClick}
        data-testid="playlist-select-video-item"
      >
        {isDraggable && <HiOutlineBars2 className="drag-bar" />}
        <div className="video-container">
          <VideoThumbnail url={video.thumbnailUrl} isPublic={true} customStyle={thumbnailStyle} />
          <div className="video-info">
            <a
              href={selectPli ? 'javascript:void(0)' : video.videoUrl}
              target={selectPli ? '_self' : '_blank'}
            >
              <div className="info-container">
                <h2>{videoData.title}</h2>
                <span>{videoData.creator}</span>
                <span>
                  조회수 {formatVideoViewCount(videoData.views)} ·{' '}
                  {formatRelativeDate(videoData.uploadDate)}
                </span>
              </div>
            </a>
            {!selectPli && (
              <button onClick={handleOpenModal} className="ellipsis-button">
                <HiOutlineEllipsisVertical aria-label="플리에 추가/삭제" />
              </button>
            )}
          </div>
        </div>
      </div>

      <OptionModal isOpen={isModalOpen} onClose={handleCloseModal} options={modalOptions} />
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
  background-color: ${theme.colors.lightestGray};
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

const spinnerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
`;

export default PlaylistContentsItem;
