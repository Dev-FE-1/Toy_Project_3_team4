import { css, SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';

import PlaylistThumbnail from '@/components/playlist/PlaylistThumbnail';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

interface PlaylistListProps {
  playlists: PlaylistModel[];
  customStyle?: SerializedStyles;
}

const Playlists: React.FC<PlaylistListProps> = ({ playlists, customStyle }) => {
  return (
    <div css={[playlistStyle, customStyle]}>
      {playlists.length > 0 &&
        playlists.map(({ playlistId, title, videos, isPublic }) => (
          <Link to={`${PATH.PLAYLIST}/${playlistId}`} key={playlistId} css={itemStyle}>
            <PlaylistThumbnail url={videos[0]?.thumbnailUrl} isPrivate={!isPublic} />
            <div className="playlist-info">
              <h2>{title}</h2>
              <p>{videos.length}개의 비디오</p>
            </div>
          </Link>
        ))}
      {playlists.length === 0 && <p>마음에 드는 플리를 구독해 보세요!</p>}
    </div>
  );
};

const playlistStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 12px;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;

  .playlist-info {
    padding: 0 6px;
    margin-top: 4px;

    h2 {
      font-size: ${theme.fontSizes.base};
      font-weight: 500;
    }

    p {
      color: ${theme.colors.darkGray};
      font-size: ${theme.fontSizes.small};
    }
  }
`;

export default Playlists;
