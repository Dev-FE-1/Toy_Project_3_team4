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

import { getPlaylist } from '@/api/fetchPlaylist';
import { updatePostsLikes } from '@/api/fetchPosts';
import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';
import defaultProfile from '@/assets/images/default-avatar.svg';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { PlaylistModel } from '@/types/playlist';
import { PostModel } from '@/types/post';
import { formatCreatedAt } from '@/utils/date';
import { extractVideoId } from '@/utils/youtubeUtils';

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
      <div>
        <div css={metaInfoStyle}>
          <div css={metaInfoStyle}>
            <UserInfo
              name={userData?.displayName || 'UnKnown User'}
              url={userData?.photoURL || defaultProfile}
              imageSize="large"
            />
            <span css={createdAtStyle}>{formatCreatedAt(post.createdAt)}</span>
          </div>
          <IconButton icon={<IoBookmarkOutline size={20} />} onClick={() => {}} />
        </div>
        <p css={contentStyle}>{post.content}</p>
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
                <HiHeart css={likeButtonStyle(isLiked)} />
              ) : (
                <HiOutlineHeart css={likeButtonStyle(isLiked)} />
              )}{' '}
              {likesCount}
            </button>
            <button css={buttonStyle}>
              <HiOutlineChatBubbleOvalLeft style={{ position: 'relative', bottom: '1px' }} />{' '}
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
