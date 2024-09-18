import { css } from '@emotion/react';

import SelectablePlaylistItem from '@/components/playlistDetail/SelectablePlaylistItem';
import { VideoModel } from '@/types/playlist';

interface SelectablePlaylistProps {
  videos: VideoModel[];
  onVideoSelect: (videoId: string) => void;
  selectedVideoId: string | null;
}

const SelectablePlaylist: React.FC<SelectablePlaylistProps> = ({
  videos,
  onVideoSelect,
  selectedVideoId,
}) => {
  return (
    <ul css={playlistStyle}>
      {videos.map((video) => (
        <SelectablePlaylistItem
          key={video.videoId}
          video={video}
          isSelected={video.videoId === selectedVideoId}
          onVideoSelect={onVideoSelect}
        />
      ))}
    </ul>
  );
};

const playlistStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export default SelectablePlaylist;
