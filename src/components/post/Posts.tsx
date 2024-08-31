import { useEffect, useState } from 'react';

import { css, SerializedStyles, Theme } from '@emotion/react';
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiHeart,
  HiChevronRight,
} from 'react-icons/hi2';
import { IoBookmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { PostModel } from '@/types/post';
import { formatRelativeDate } from '@/utils/date';

import VideoPlayer from './VideoPlayer';
import IconButton from '../common/buttons/IconButton';
import UserInfo from '../user/UserInfo';

interface PostProps {
  id: string;
  post: PostModel;
  customStyle?: SerializedStyles;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const currentUser = useAuth();
  const { userData } = useUserData(post.userId);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(post.likes.includes(currentUser.uid));
    }
  }, [currentUser, post.likes]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div css={postContainerStyle}>
      <VideoPlayer video={post.video[0]} />
      <div>
        <div css={metaInfoStyle}>
          <div css={metaInfoStyle}>
            <UserInfo
              name={userData?.displayName || 'UnKnown User'}
              url={userData?.photoURL || '@assets/default-avatar.svg'}
              imageSize="large"
            />
            <span css={createdAtStyle}>{formatRelativeDate(post.createdAt)}</span>
          </div>
          <IconButton icon={<IoBookmarkOutline size={20} />} onClick={() => {}} />
        </div>
        <p css={contentStyle}>{post.content}</p>
        <p css={playlistStyle}>
          <Link to={`/playlist/${post.playlistId}`}>
            <span>[Playlist] {post.playlistName}</span>
            <HiChevronRight />
          </Link>
        </p>
        <div css={metaInfoStyle}>
          <div css={buttonWrapStyle}>
            <button css={buttonStyle} onClick={toggleLike}>
              {isLiked ? (
                <HiHeart css={likeButtonStyle(isLiked)} />
              ) : (
                <HiOutlineHeart css={likeButtonStyle(isLiked)} />
              )}{' '}
              {likesCount}
            </button>
            <button css={buttonStyle}>
              <HiOutlineChatBubbleOvalLeft style={{ position: 'relative', bottom: '1px' }} />{' '}
              {post.comments.length}
            </button>
          </div>
          <p css={pliStyle}>
            {post.playlistName} (<span>{post.video.length}</span>)
          </p>
        </div>
      </div>
    </div>
  );
};

const postContainerStyle = css`
  padding-bottom: 32px;
`;

const metaInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

const createdAtStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkGray};
  padding-left: 12px;
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
  min-width: 40px;
`;

const likeButtonStyle = (isLiked: boolean) => (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  color: ${isLiked ? theme.colors.red : 'inherit'};
`;

const pliStyle = (theme: Theme) => css`
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.micro};
  text-decoration: underline;
`;

export default Post;
