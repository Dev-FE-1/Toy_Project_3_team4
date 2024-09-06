import { useEffect, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiHeart,
  HiChevronRight,
  HiOutlineBookmark,
  HiBookmark,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { updatePostsLikes } from '@/api/fetchPosts';
import IconButton from '@/components/common/buttons/IconButton';
import VideoPlayer from '@/components/post/VideoPlayer';
import UserInfo from '@/components/user/UserInfo';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useFetchVideoTitle } from '@/hooks/useFetchVideoTitle';
import { usePlaylistById } from '@/hooks/usePlaylists';
import {
  useSubscribePlaylist,
  useUnsubscribePlaylist,
  useCheckSubscription,
} from '@/hooks/useSubscribePlaylist';
import { useUserData } from '@/hooks/useUserData';
import theme from '@/styles/theme';
import { PostModel } from '@/types/post';
import { formatCreatedAt } from '@/utils/date';

interface PostProps {
  id: string;
  post: PostModel;
  customStyle?: SerializedStyles;
  isDetail?: boolean;
}

const Post: React.FC<PostProps> = ({ post, isDetail = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentUser = useAuth();
  const { userData } = useUserData(post.userId);
  const { data: playlist } = usePlaylistById(post.playlistId);
  const videoTitle = useFetchVideoTitle(post.video);

  const { data: isPlaylistSubscribed, refetch } = useCheckSubscription(post.playlistId);
  const subscribeMutation = useSubscribePlaylist(post.playlistId);
  const unsubscribeMutation = useUnsubscribePlaylist(post.playlistId);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(post.likes.includes(currentUser.uid));
    }
  }, [currentUser, post.likes]);

  useEffect(() => {
    if (isPlaylistSubscribed !== undefined) {
      setIsSubscribed(isPlaylistSubscribed);
    }
  }, [isPlaylistSubscribed]);

  const toggleSubscription = () => {
    if (isSubscribed) {
      unsubscribeMutation.mutate(undefined, {
        onSuccess: () => {
          setIsSubscribed(false);
          refetch();
        },
      });
    } else {
      subscribeMutation.mutate(undefined, {
        onSuccess: () => {
          setIsSubscribed(true);
          refetch();
        },
      });
    }
  };

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    await updatePostsLikes({ postId: post.postId, userId: currentUser?.uid || '' });
  };

  return (
    <div css={postContainerStyle}>
      <VideoPlayer video={post.video} />
      <div className="contents-wrapper">
        <div css={metaInfoStyle}>
          <div css={metaInfoStyle}>
            <UserInfo
              name={userData?.displayName || 'UnKnown User'}
              url={userData?.photoURL}
              imageSize="medium"
              userId={post.userId}
            />
            <span css={createdAtStyle}>{formatCreatedAt(post.createdAt)}</span>
          </div>
          <IconButton
            icon={isSubscribed ? <HiBookmark size={20} /> : <HiOutlineBookmark size={20} />}
            onClick={toggleSubscription}
            enabled={isSubscribed}
          />
        </div>
        <p css={contentStyle(isDetail)}>{post.content}</p>
        <p css={playlistStyle}>
          <Link to={post.video}>
            <span>{videoTitle}</span>
            <HiChevronRight />
          </Link>
        </p>
        <div css={metaInfoStyle}>
          <div css={buttonWrapStyle}>
            <button css={buttonStyle} onClick={toggleLike}>
              {isLiked ? (
                <HiHeart css={likeButtonStyle(isLiked)} size={20} />
              ) : (
                <HiOutlineHeart css={likeButtonStyle(isLiked)} size={20} />
              )}
              <span>{likesCount}</span>
            </button>
            <Link
              to={`${PATH.COMMENT}?postId=${post.postId}`}
              css={buttonStyle}
              className="chat-bubble-button"
            >
              <HiOutlineChatBubbleOvalLeft size={20} />
              {post.comments?.length}
            </Link>
          </div>
          <p css={pliStyle}>
            {playlist?.title} (<span>{playlist?.videos.length}</span>)
          </p>
        </div>
      </div>
    </div>
  );
};

const postContainerStyle = css`
  padding-bottom: 24px;

  .contents-wrapper {
    padding: 0 8px;
  }
`;

const metaInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

const createdAtStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkGray};
  padding-left: 12px;
`;

const contentStyle = (isDetail: boolean) => css`
  font-size: ${theme.fontSizes.small};
  margin-bottom: 8px;
  text-align: justify;
  ${!isDetail &&
  `
    display: -webkit-box;
    max-height: calc(1.4em * 2); 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`;

const playlistStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkGray};
  padding-bottom: 12px;

  a {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 100%;
    }

    svg {
      flex-shrink: 0;
      stroke-width: 0.5;
    }
  }
`;

const buttonWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  font-size: ${theme.fontSizes.small};

  svg {
    stroke-width: 1.7;
  }

  &.chat-bubble-button {
    svg {
      margin-bottom: 2px;
    }
  }
`;

const likeButtonStyle = (isLiked: boolean) => css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  color: ${isLiked ? theme.colors.red : 'inherit'};
`;

const pliStyle = css`
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.small};
  text-decoration: underline;
`;

export default Post;
