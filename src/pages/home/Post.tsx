import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface PostProps {
  content: string;
  createdAt: string;
  likes: string[];
  video?: string;
}

const Post: React.FC<PostProps> = ({ content, createdAt, likes, video }) => {
  return (
    <div css={postStyles}>
      <div className="image-container">
        {video ? (
          <img src={video} alt="Video thumbnail" className="thumbnail" />
        ) : (
          <img
            src="https://i.imgur.com/mjaKL7z.jpeg"
            alt="Default thumbnail"
            className="thumbnail default"
          />
        )}
        <div className="play-button">▶</div>
      </div>
      <div className="content-container">
        <p className="content">{content}</p>
        <div className="meta-info">
          <span>{new Date(createdAt).toLocaleString()}</span>
          <span>❤ {likes.length}</span>
        </div>
      </div>
    </div>
  );
};

const postStyles = css`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .image-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */

    .thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.default {
        background-color: ${theme.colors.lightGray};
      }
    }

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }

  .content-container {
    padding: 16px;

    .content {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }

    .meta-info {
      display: flex;
      justify-content: space-between;
      color: ${theme.colors.darkGray};
      font-size: ${theme.fontSizes.small};
    }
  }
`;

export default Post;
