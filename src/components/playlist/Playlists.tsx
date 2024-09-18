import { css, SerializedStyles } from '@emotion/react';
import { PiYoutubeLogo } from 'react-icons/pi';

import EmptyMessage from '@/components/EmptyMessage';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { useAuth } from '@/hooks/useAuth';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

interface PlaylistListProps {
  playlists: (PlaylistModel & { containsVideo?: boolean })[];
  customStyle?: SerializedStyles;
  customVideoStyle?: SerializedStyles;
  isColumn?: boolean;
  onPlaylistClick?: (playlistId: string, title: string, containsVideo: boolean) => void;
  disabledPlaylists?: boolean;
}

const Playlists: React.FC<PlaylistListProps> = ({
  playlists,
  customStyle,
  customVideoStyle,
  onPlaylistClick,
  isColumn = true,
  disabledPlaylists = false,
}) => {
  const currentUser = useAuth();

  return (
    <>
      <div css={[playlistStyle, customStyle]} data-testid="playlists-container">
        {playlists.length > 0 &&
          playlists
            .filter(({ isPublic, userId }) => isPublic || userId === currentUser?.uid)
            .map(({ playlistId, title, videos, isPublic, containsVideo }) => (
              <div
                data-testid="playlist-item"
                key={`playlist-${playlistId}`}
                css={[
                  itemStyle(isColumn),
                  disabledPlaylists && containsVideo && disabledPlaylistStyle,
                ]}
                onClick={() =>
                  onPlaylistClick && !containsVideo
                    ? onPlaylistClick(playlistId, title, !!containsVideo)
                    : null
                }
              >
                <VideoThumbnail
                  url={videos[0]?.thumbnailUrl}
                  isPublic={isPublic}
                  type="stack"
                  customStyle={customVideoStyle}
                />
                <div className="playlist-info">
                  <h2 css={textEllipsis(1)}>{title}</h2>
                  <p>{videos.length}개의 비디오</p>
                </div>
              </div>
            ))}
      </div>
      {playlists.length === 0 && (
        <EmptyMessage Icon={PiYoutubeLogo}>마음에 드는 플리를 구독해 보세요!</EmptyMessage>
      )}
    </>
  );
};

const playlistStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 23px 12px;
`;

const itemStyle = (isColumn: boolean) => css`
  display: flex;
  flex-direction: ${isColumn ? 'column' : 'row'};
  align-items: ${isColumn ? '' : 'center'};
  cursor: pointer;

  .playlist-info {
    padding: ${isColumn ? '0 6px' : '0'};
    margin-top: ${isColumn ? '4px' : '0'};
    margin-left: ${isColumn ? '0' : '8px'};

    h2 {
      font-size: ${theme.fontSizes.small};
      font-weight: 500;
    }

    p {
      color: ${theme.colors.darkGray};
      font-size: ${theme.fontSizes.micro};
    }

    @media screen and (min-width: ${theme.width.large}) {
      h2 {
        font-size: ${theme.fontSizes.base};
        font-weight: 500;
      }

      p {
        color: ${theme.colors.darkGray};
        font-size: ${theme.fontSizes.small};
      }
    }
  }
`;

const disabledPlaylistStyle = css`
  opacity: 0.5;
  pointer-events: none;
`;

export default Playlists;
