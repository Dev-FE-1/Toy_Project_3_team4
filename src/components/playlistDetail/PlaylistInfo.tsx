import { css, SerializedStyles } from '@emotion/react';

import FitButton from '@/components/common/buttons/FitButton';
import PrivateLabel from '@/components/playlist/PrivateLabel';
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
  const { title, videos, isPublic, description } = playlist;
  const { displayName, photoURL } = user;

  return (
    <div css={[playlistInfoStyle, customStyle]}>
      <div className="thumbnail-container">
        <img src={videos[0]?.thumbnailUrl} alt={videos[0]?.title || ''} />
        {!isPublic && <PrivateLabel customStyle={labelStyle} />}
      </div>
      <div className="info-container">
        <div className="title">
          <h1>{title}</h1>
          <FitButton styleType="primary">구독</FitButton>
        </div>
        {description !== '' && <p className="description">{description}</p>}
        <div className="info-footer">
          <UserInfo name={displayName} url={photoURL} />
          <span className="video-count">{videos.length}개의 동영상</span>
        </div>
      </div>
    </div>
  );
};

const playlistInfoStyle = css`
  .thumbnail-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .info-container {
    padding: 16px 8px 0;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: ${theme.fontSizes.large};
      }
    }

    .description {
      margin-top: 8px;
      font-size: ${theme.fontSizes.small};
      color: ${theme.colors.darkestGray};
    }
  }

  .info-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
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

export default PlaylistInfo;
