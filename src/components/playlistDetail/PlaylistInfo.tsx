import { css, SerializedStyles } from '@emotion/react';

import FitButton from '@/components/common/buttons/FitButton';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import UserInfo from '@/components/user/UserInfo';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

interface PlaylistInfoProps {
  playlist: PlaylistModel;
  user: UserModel;
  customStyle?: SerializedStyles;
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist, user, customStyle }) => {
  const { title, videos, isPublic } = playlist;
  const { displayName, photoURL } = user;

  return (
    <div css={[playlistInfoStyle, customStyle]}>
      <VideoThumbnail
        url={videos[0]?.thumbnailUrl}
        isPublic={isPublic}
        customLabelStyle={labelStyle}
        customStyle={thumbnailStyle}
      />
      <div className="info-container">
        <div className="title">
          <h1>{title}</h1>
          <FitButton styleType="primary">구독</FitButton>
        </div>
        <div className="info-footer">
          <UserInfo name={displayName} url={photoURL} />
          <span className="video-count">{videos.length}개의 동영상</span>
        </div>
      </div>
    </div>
  );
};

const playlistInfoStyle = css`
  .info-container {
    padding: 12px 8px 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: ${theme.fontSizes.large};
      }
    }
  }

  .info-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
    line-height: 100%;
    font-size: ${theme.fontSizes.small};
  }

  .video-count {
    color: ${theme.colors.darkGray};
  }
`;

const labelStyle = css`
  top: 4%;
  left: 3%;
  width: 10%;
  padding-bottom: 10%;
`;

const thumbnailStyle = css`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

export default PlaylistInfo;
