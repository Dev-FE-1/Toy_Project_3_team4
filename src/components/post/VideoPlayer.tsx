import { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import YouTube, { YouTubeEvent } from 'react-youtube';

import { Video } from '@/types/post';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const playerRef = useRef<YouTube>(null);

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.internalPlayer.pauseVideo();
    } else {
      playerRef.current?.internalPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const onReady = (event: YouTubeEvent) => {
    event.target.pauseVideo();
  };

  const onStateChange = (event: YouTubeEvent) => {
    setIsPlaying(event.data === YouTube.PlayerState.PLAYING);
  };
  return (
    <div
      css={videoContainerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <YouTube
        videoId={video.videoId}
        opts={{
          width: '100%',
          height: '200',
          playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
            controls: 0,
            showinfo: 0,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            disablekb: 1,
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        ref={playerRef}
      />
      <button css={playPauseButton(isPlaying, isHovering)} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

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

const playPauseButton = (isPlaying: boolean, isHovering: boolean) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(30, 41, 59, 0.16);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    opacity 0.3s,
    background-color 0.3s;
  z-index: 2;
  opacity: ${isPlaying && !isHovering ? 0 : 1};
  pointer-events: ${isPlaying && !isHovering ? 'none' : 'auto'};
`;

export default VideoPlayer;
