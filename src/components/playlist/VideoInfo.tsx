import { css } from '@emotion/react';

import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { YoutubeVideoModel } from '@/types/playlist';
import { formatRelativeDate } from '@/utils/date';
import { formatVideoViewCount } from '@/utils/youtubeUtils';

interface VideoInfoProps {
  video: YoutubeVideoModel;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const { title, creator, views, uploadDate } = video;

  return (
    <div css={videoInfoStyle}>
      <h2>{title}</h2>
      <span>{creator}</span>
      <span>
        조회수 {formatVideoViewCount(views)} · {formatRelativeDate(uploadDate)}
      </span>
    </div>
  );
};

const videoInfoStyle = css`
  display: flex;
  min-width: 0;
  flex-direction: column;

  h2 {
    ${textEllipsis(3)}
    max-height: 4.2em;
    padding-bottom: 4px;
    font-size: ${theme.fontSizes.small};
    font-weight: normal;
  }

  span {
    font-size: ${theme.fontSizes.micro};
    color: ${theme.colors.darkGray};
    ${textEllipsis(1)}
  }

  @media screen and (min-width: ${theme.width.large}) {
    h2 {
      font-size: ${theme.fontSizes.base};
    }

    span {
      font-size: ${theme.fontSizes.small};
    }
  }
`;

export default VideoInfo;
