import { css, SerializedStyles } from '@emotion/react';

import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

interface PlaylistListProps {
  playlists: PlaylistModel[];
  customStyle?: SerializedStyles;
  customVideoStyle?: SerializedStyles;
  isColumn?: boolean;
  onPlaylistClick?: (playlistId: string, title: string) => void;
}

const Playlists: React.FC<PlaylistListProps> = ({
  playlists,
  customStyle,
  customVideoStyle,
  onPlaylistClick,
  isColumn = true,
}) => {
  return (
    <div css={[playlistStyle, customStyle]}>
      {playlists.length > 0 &&
        playlists.map(({ playlistId, title, videos, isPublic }) => (
          <div
            key={`playlist-${playlistId}`}
            css={itemStyle(isColumn)}
            onClick={() => (onPlaylistClick ? onPlaylistClick(playlistId, title) : null)}
          >
            <VideoThumbnail
              url={videos[0]?.thumbnailUrl}
              isPublic={isPublic}
              type="stack"
              customStyle={customVideoStyle}
            />
            <div className="playlist-info">
              <h2>{title}</h2>
              <p>{videos.length}개의 비디오</p>
            </div>
          </div>
        ))}
      {playlists.length === 0 && <p>마음에 드는 플리를 구독해 보세요!</p>}
    </div>
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
  cursor: pointer;

  .playlist-info {
    padding: 0 6px;
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

export default Playlists;
