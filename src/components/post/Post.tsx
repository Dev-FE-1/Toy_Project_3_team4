import { useEffect, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiHeart,
  HiChevronRight,
  HiOutlineBookmark,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { getPlaylist } from '@/api/fetchPlaylist';
import { updatePostsLikes } from '@/api/fetchPosts';
import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';
import IconButton from '@/components/common/buttons/IconButton';
import VideoPlayer from '@/components/post/VideoPlayer';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { PostModel } from '@/types/post';
import { formatCreatedAt } from '@/utils/date';
import { extractVideoId } from '@/utils/youtubeUtils';

interface PostProps {
  id: string;
  post: PostModel;
  customStyle?: SerializedStyles;
  isDetail?: boolean;
}

const Post: React.FC<PostProps> = ({ post, isDetail = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const currentUser = useAuth();
  const { userData } = useUserData(post.userId);
  const [playlist, setPlaylist] = useState<PlaylistModel>();
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlist = await getPlaylist({ playlistId: post.playlistId });
      setPlaylist(playlist);
    };

    fetchPlaylist();
  }, [post.playlistId]);

  useEffect(() => {
    const getVideoTitle = async () => {
      try {
        const videoId = extractVideoId(post.video);
        if (videoId) {
          const videoData = await fetchYouTubeVideoData(videoId);
          setVideoTitle(videoData.title);
        } else {
          console.error('Invalid video URL');
          setVideoTitle('유효하지 않은 비디오 URL');
        }
      } catch (error) {
        console.error('비디오 제목을 가져오는데 실패했습니다:', error);
        setVideoTitle('비디오 제목을 불러올 수 없습니다');
      }
    };

    getVideoTitle();
  }, [post.video]);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(post.likes.includes(currentUser.uid));
    }
  }, [currentUser, post.likes]);

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
          <IconButton icon={<HiOutlineBookmark size={20} />} onClick={() => {}} />
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
            <button css={buttonStyle} className="chat-bubble-button">
              <HiOutlineChatBubbleOvalLeft size={20} />
              {post.comments?.length}
            </button>
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
