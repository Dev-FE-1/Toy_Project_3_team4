import { css } from '@emotion/react';

import PlaylistContentsItem from '@/components/playlistDetail/PlaylistContentsItem';
import { VideoModel } from '@/types/playlist';

interface PlaylistContentsProps {
  videos: VideoModel[];
  onVideoSelect: (videoId: string) => void;
  selectedVideoId: string | null;
  selectPli?: boolean;
}

const PlaylistContents: React.FC<PlaylistContentsProps> = ({
  videos,
  onVideoSelect,
  selectedVideoId,
  selectPli = false,
}) => {
  return (
    <ul css={playlistStyle}>
      {videos.map((video, index) => (
        <PlaylistContentsItem
          key={`${video.videoId}-${index}`}
          video={video}
          isSelected={video.videoId === selectedVideoId}
          onVideoSelect={onVideoSelect}
          selectPli={selectPli}
        />
      ))}
    </ul>
  );
};

const playlistStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 0 8px;
`;

export default PlaylistContents;
