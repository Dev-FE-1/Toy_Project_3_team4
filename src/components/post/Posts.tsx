import { useState } from 'react';

import { css, SerializedStyles, Theme } from '@emotion/react';
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiHeart,
  HiChevronRight,
} from 'react-icons/hi2';
import { IoBookmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { PostModel } from '@/types/post';

interface PostProps {
  id: string;
  post: PostModel;
  customStyle?: SerializedStyles;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div css={postContainerStyle}>
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
              <img src={post.userImgUrl} alt="Writer" />
            </div>
            <p>{post.userName}</p>
            <span>{post.createdAt}</span>
          </div>
          <IoBookmarkOutline />
        </div>
        <p css={contentStyle}>{post.content}</p>
        <p css={playlistStyle}>
          <Link to={post.video.videoUrl}>
            <span>[Playlist] {post.video.title}</span>
            <HiChevronRight />
          </Link>
        </p>
        <div css={metaInfoStyle}>
          <div css={buttonWrapStyle}>
            <button css={likeButtonStyle(isLiked)} onClick={toggleLike}>
              {isLiked ? <HiHeart /> : <HiOutlineHeart />} {likesCount}
            </button>
            <button css={buttonStyle}>
              <HiOutlineChatBubbleOvalLeft style={{ position: 'relative', bottom: '1px' }} />{' '}
              {post.comments.length}
            </button>
          </div>
          <p css={pliStyle}>
            {post.playlistName} (<span>비디오개수</span>)
          </p>
        </div>
      </div>
    </div>
  );
};

const postContainerStyle = css`
  padding-bottom: 32px;
`;

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
    overflow: hidden;

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

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const buttonWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
`;

const likeButtonStyle = (isLiked: boolean) => (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  color: ${isLiked ? theme.colors.red : 'inherit'};
  min-width: 40px;
`;

const pliStyle = (theme: Theme) => css`
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.micro};
  text-decoration: underline;
`;

export default Post;
