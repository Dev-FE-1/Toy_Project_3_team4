import { css } from '@emotion/react';

import VideoInfo from '@/components/playlist/VideoInfo';
import PlaylistItem from '@/components/playlistDetail/PlaylistItem';
import { useYouTubeVideoData } from '@/hooks/useYouTubeVideoData';
import theme from '@/styles/theme';
import { VideoModel, YoutubeVideoModel } from '@/types/playlist';

interface SelectablePlaylistItemProps {
  video: VideoModel;
  isSelected: boolean;
  onVideoSelect: (videoId: string) => void;
}

const SelectablePlaylistItem: React.FC<SelectablePlaylistItemProps> = ({
  video,
  isSelected,
  onVideoSelect,
}) => {
  const { data: videoData, isLoading, isError } = useYouTubeVideoData(video.videoId);
  const onClick = () => onVideoSelect(video.videoId);

  return (
    <PlaylistItem
      video={video}
      onClick={onClick}
      isLoading={isLoading}
      isError={isError}
      videoData={videoData}
      customStyle={isSelected ? selectedStyle : undefined}
    >
      <VideoInfo video={videoData as YoutubeVideoModel} />
    </PlaylistItem>
  );
};

const selectedStyle = css`
  background-color: ${theme.colors.lightestGray};
  border-radius: 8px;
  transition: background-color 0.3s ease;
`;

export default SelectablePlaylistItem;
