import { css } from '@emotion/react';
import { FaPlay } from 'react-icons/fa';

interface VideoPlayButtonProps {
  onClick: () => void;
}

const VideoPlayButton: React.FC<VideoPlayButtonProps> = ({ onClick }) => {
  return (
    <button css={playButtonStyle} onClick={onClick}>
      <FaPlay />
    </button>
  );
};

const playButtonStyle = css`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(5px);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
`;

export default VideoPlayButton;
