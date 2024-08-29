import { css } from '@emotion/react';

import PlaylistContentsItem from '@/components/playlistDetail/PlaylistContentsItem';
import { VideoModel } from '@/types/playlist';

interface PlaylistContentsProps {
  videos: VideoModel[];
}

const PlaylistContents: React.FC<PlaylistContentsProps> = ({ videos }) => {
  return (
    <ul css={playlistStyle}>
      {videos.map((video) => (
        <PlaylistContentsItem key={video.videoId} video={video} />
      ))}
    </ul>
  );
};

const playlistStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0 8px;
`;

export default PlaylistContents;
