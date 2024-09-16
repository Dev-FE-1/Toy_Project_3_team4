import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlineEllipsisVertical, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import OptionModal from '@/components/common/modals/OptionModal';
import VideoInfo from '@/components/playlist/VideoInfo';
import PlaylistItem from '@/components/playlistDetail/PlaylistItem';
import { PATH } from '@/constants/path';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { useRemoveVideoFromPlaylist } from '@/hooks/useRemoveVideoFromPlaylist';
import { useYouTubeVideoData } from '@/hooks/useYouTubeVideoData';
import { useToastStore } from '@/stores/toastStore';
import theme from '@/styles/theme';
import { VideoModel, YoutubeVideoModel } from '@/types/playlist';

interface DraggablePlaylistItemProps {
  playlistId: string;
  video: VideoModel;
  isDraggable?: boolean;
}

const DraggablePlaylistItem: React.FC<DraggablePlaylistItemProps> = ({
  playlistId,
  video,
  isDraggable = true,
}) => {
  const {
    isOpen: isOptionModalOpen,
    open: openOptionModal,
    close: closeOptionModal,
  } = useModalWithOverlay('optionModal', video.videoId);

  const navigate = useNavigate();

  const { data: videoData, isLoading, isError } = useYouTubeVideoData(video.videoId);
  const removeVideoMutation = useRemoveVideoFromPlaylist();

  const handleOpenModal = () => openOptionModal();
  const handleCloseModal = () => closeOptionModal();
  const addToast = useToastStore((state) => state.addToast);

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

  return (
    <PlaylistItem
      video={video}
      isLoading={isLoading}
      isError={isError}
      isDraggable={isDraggable}
      videoData={videoData}
    >
      <a href={video.videoUrl} target="_blank" rel="noreferrer noopener">
        <VideoInfo video={videoData as YoutubeVideoModel} />
      </a>
      <button onClick={handleOpenModal} css={verticalMenuStyle}>
        <HiOutlineEllipsisVertical aria-label="플리에 추가/삭제" />
      </button>

      <OptionModal
        isOpen={isOptionModalOpen}
        onClose={handleCloseModal}
        options={isDraggable ? modalOptions : modalOptions.slice(0, 1)}
      />
    </PlaylistItem>
  );
};

const verticalMenuStyle = css`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: transparent;
  border: none;

  svg {
    font-size: 20px;
  }

  @media screen and (min-width: ${theme.width.large}) {
    top: 10px;

    svg {
      font-size: 24px;
      margin-top: -2px;
    }
  }
`;

export default DraggablePlaylistItem;
