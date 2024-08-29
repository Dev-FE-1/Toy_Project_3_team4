import { css } from '@emotion/react';
import YouTube from 'react-youtube';

import { Video } from '@/types/post';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => (
  <div css={videoContainerStyle}>
    <YouTube
      videoId={video.videoId}
      opts={{
        width: '100%',
        height: '200',
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1,
        },
      }}
    />
  </div>
);

const videoContainerStyle = css`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default VideoPlayer;
