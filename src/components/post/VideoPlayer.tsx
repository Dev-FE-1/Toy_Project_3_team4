import { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { FaPause } from 'react-icons/fa';
import { HiPlay } from 'react-icons/hi2';
import YouTube, { YouTubeEvent } from 'react-youtube';

import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import theme from '@/styles/theme';
import { extractVideoId } from '@/utils/youtubeUtils';

interface VideoPlayerProps {
  video: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const playerRef = useRef<YouTube>(null);

  const togglePlay = () => {
    if (showThumbnail) {
      setShowThumbnail(false);
      playerRef.current?.internalPlayer.playVideo();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        playerRef.current?.internalPlayer.pauseVideo();
      } else {
        playerRef.current?.internalPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
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
      <VideoThumbnail
        url={`https://img.youtube.com/vi/${extractVideoId(video) || ''}/0.jpg`}
        isPublic={true}
        customStyle={videoThumbnailStyle(showThumbnail)}
      />
      <div css={youtubeContainerStyle(showThumbnail)}>
        <YouTube
          videoId={extractVideoId(video) || ''}
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
              enablejsapi: 1,
              origin: window.location.origin,
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
          ref={playerRef}
        />
      </div>
      <button css={playPauseButton(isPlaying, isHovering || showThumbnail)} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <HiPlay size={36} className="play" />}
      </button>
    </div>
  );
};

const videoContainerStyle = css`
  position: relative;
  margin-bottom: 8px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.lightGray};
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 101%;
    height: 101%;
  }
`;

const videoThumbnailStyle = (showThumbnail: boolean) => css`
  display: ${showThumbnail ? 'block' : 'none'};

  .image-container {
    border: 0;
    border-radius: 0;

    img {
      width: 101%;
    }
  }
`;

const youtubeContainerStyle = (showThumbnail: boolean) => css`
  display: ${showThumbnail ? 'none' : 'block'};
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const playPauseButton = (isPlaying: boolean, isHovering: boolean) => css`
  color: ${theme.colors.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 41, 59, 0.16);
  backdrop-filter: blur(5px);
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

  svg.play {
    padding-left: 4px;
  }
`;

export default VideoPlayer;
