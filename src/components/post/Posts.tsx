import { css, SerializedStyles, Theme } from '@emotion/react';
import { HiOutlineHeart, HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { IoBookmarkOutline } from 'react-icons/io5';

import { PostModel } from '@/types/post';

interface PostsProps {
  id: string;
  post: PostModel;
  customStyle?: SerializedStyles;
}

const posts: React.FC<PostsProps> = ({ post }) => {
  return (
    <div>
      <div css={videoContainerStyle}>
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${post.video.videoId}`}
          title={post.video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <div css={metaInfoStyle}>
          <div css={metaWriterStyle}>
            <div>
              <img src="" alt="Writer" />
            </div>
            <p>{post.userId}</p>
            <span>{post.createdAt}</span>
          </div>
          <IoBookmarkOutline />
        </div>
        <p css={contentStyle}>{post.content}</p>
        <p css={playlistStyle}>
          <span>[Playlist]</span> 플레이리스트 이름
        </p>
        <div css={metaInfoStyle}>
          <div css={buttonStyle}>
            <button css={buttonStyle}>
              <HiOutlineHeart /> {post.likes.length}
            </button>
            <button css={buttonStyle}>
              <HiOutlineChatBubbleOvalLeft /> {post.comments.length}
            </button>
          </div>
          <p css={pliStyle}>
            플리제목 (<span>비디오개수</span>)
          </p>
        </div>
      </div>
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

const metaInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const metaWriterStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 12px;

  div {
    width: 24px;
    height: 24px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    font-size: ${theme.fontSizes.micro};
  }

  span {
    font-size: ${theme.fontSizes.micro};
    color: ${theme.colors.darkGray};
  }
`;

const contentStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
  padding-bottom: 8px;
`;

const playlistStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.micro};
  color: ${theme.colors.darkGray};
  padding-bottom: 8px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
`;

const pliStyle = (theme: Theme) => css`
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.micro};
  text-decoration: underline;
`;

export default posts;
