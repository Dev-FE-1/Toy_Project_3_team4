import { useEffect, useMemo, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiEllipsisVertical,
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiHeart,
  HiChevronRight,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import FullModal from '@/components/common/modals/FullModal';
import OptionModal from '@/components/common/modals/OptionModal';
import VideoPlayer from '@/components/post/VideoPlayer';
import UserInfo from '@/components/user/UserInfo';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useComments } from '@/hooks/useComments';
import { useDeletePost } from '@/hooks/useDeletePost';
import { useFetchVideoTitle } from '@/hooks/useFetchVideoTitle';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { usePlaylistById } from '@/hooks/usePlaylists';
import {
  useSubscribePlaylist,
  useUnsubscribePlaylist,
  useCheckSubscription,
} from '@/hooks/useSubscribePlaylist';
import { useToggleLikes } from '@/hooks/useToggleLikes';
import { useUserData } from '@/hooks/useUserData';
import NewPost from '@/pages/NewPost';
import { useToastStore } from '@/stores/toastStore';
import { textEllipsis } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
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
  const navigate = useNavigate();
  const videoTitle = useFetchVideoTitle(post.video);
  const videoId = useMemo(() => extractVideoId(post.video) ?? '', [post.video]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const {
    isOpen: isOptionModalOpen,
    open: openOptionModal,
    close: closeOptionModal,
  } = useModalWithOverlay('postOptionModal', post.postId);
  const currentUser = useAuth();
  const { data: playlist, isLoading: isPlaylistLoading } = usePlaylistById(post.playlistId);
  const { data: isPlaylistSubscribed } = useCheckSubscription(post.playlistId);
  const subscribeMutation = useSubscribePlaylist(post.playlistId);
  const unsubscribeMutation = useUnsubscribePlaylist(post.playlistId);
  const { comments } = useComments(post.postId);
  const addToast = useToastStore((state) => state.addToast);
  const deletePost = useDeletePost(post.userId);
  const {
    isOpen: isEditModalOpen,
    open: openEditModal,
    close: closeEditModal,
  } = useModalWithOverlay('editPostModal', post.postId);
  const postDetailPath = `${PATH.POST_DETAIL.replace(':postId', '')}${post.postId}`;
  const { userData } = useUserData(post.userId);
  const toggleLikesMutation = useToggleLikes(currentUser?.uid || '');

  useEffect(() => {
    if (currentUser) {
      setIsLiked(post.likes.includes(currentUser.uid));
      setLikesCount(post.likes.length);
    }
  }, [currentUser, post.likes]);

  useEffect(() => {
    setIsSubscribed(isPlaylistSubscribed);
  }, [isPlaylistSubscribed]);

  const toggleSubscription = () => {
    if (isSubscribed) {
      unsubscribeMutation.mutate(undefined, {
        onSuccess: () => {
          setIsSubscribed(false);
        },
      });
    } else {
      subscribeMutation.mutate(undefined, {
        onSuccess: () => {
          setIsSubscribed(true);
        },
      });
    }
  };

  const handleButtonClick = () => {
    navigate(`${PATH.PLAYLIST}/${post.playlistId}`);
  };

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    toggleLikesMutation.mutate(post.postId);
  };

  const handleDeletePost = async () => {
    deletePost.mutate(post.postId, {
      onSuccess: () => {
        addToast('포스트가 삭제되었습니다.');
      },
      onError: (error) => {
        console.warn('포스트 삭제 실패:', error);
        addToast('포스트 삭제에 실패했습니다.');
      },
    });
    closeOptionModal();
  };

  const handleEditPost = () => {
    closeOptionModal();
    openEditModal();
  };

  const playlistObj = useMemo(() => {
    if (!playlist) {
      return {
        bookMark: false,
        isClickable: false,
        label: '알 수 없는 플레이리스트',
        isPublicPlaylist: false,
      };
    }
    const isUnknownPlaylist = !playlist.videos.some((value) => value.videoId === videoId);
    const isPublicPlaylist =
      !(!playlist.isPublic && currentUser?.uid !== post.userId) && !isUnknownPlaylist;
    const bookMark = isPublicPlaylist && currentUser?.uid !== post.userId && !isUnknownPlaylist;

    const label = isPlaylistLoading
      ? '플레이리스트 로딩 중...'
      : isUnknownPlaylist
        ? '알 수 없는 플레이리스트'
        : !playlist.isPublic && currentUser?.uid !== post.userId
          ? '비공개 플레이리스트'
          : playlist?.title;

    const isClickable =
      currentUser?.uid === post.userId
        ? !isUnknownPlaylist
        : !!playlist.isPublic && !isUnknownPlaylist && !isPlaylistLoading;

    return {
      bookMark,
      isClickable,
      label,
      isPublicPlaylist,
    };
  }, [currentUser?.uid, isPlaylistLoading, playlist, post.userId, videoId]);

  return (
    <div css={postContainerStyle} data-testid="post">
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
          {playlistObj.bookMark && (
            <IconButton
              icon={isSubscribed ? <HiBookmark size={20} /> : <HiOutlineBookmark size={20} />}
              onClick={toggleSubscription}
              enabled={isSubscribed}
            />
          )}
          {currentUser?.uid === post.userId && (
            <>
              <IconButton icon={<HiEllipsisVertical size={20} />} onClick={openOptionModal} />
              {isOptionModalOpen && (
                <OptionModal
                  isOpen={isOptionModalOpen}
                  onClose={closeOptionModal}
                  options={[
                    { label: '포스트 수정', onClick: handleEditPost, Icon: HiOutlinePencil },
                    { label: '포스트 삭제', onClick: handleDeletePost, Icon: HiOutlineTrash },
                  ]}
                />
              )}
              {isEditModalOpen && (
                <FullModal isOpen={isEditModalOpen} onClose={closeEditModal}>
                  <NewPost
                    playlistId={post.playlistId}
                    videoId={extractVideoId(post.video) || ''}
                    onClose={closeEditModal}
                    initialDescription={post.content}
                    isEditing={true}
                    postId={post.postId}
                  />
                </FullModal>
              )}
            </>
          )}
        </div>
        <p css={contentStyle(isDetail)}>
          {isDetail ? post.content : <Link to={postDetailPath}>{post.content}</Link>}
        </p>
        <p css={playlistStyle}>
          <Link to={post.video} target="_blank">
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
            <Link to={postDetailPath} css={buttonStyle} className="chat-bubble-button">
              <HiOutlineChatBubbleOvalLeft size={20} />
              {comments.length}
            </Link>
          </div>
          <button
            css={pliStyle(playlistObj.isClickable)}
            onClick={playlistObj.isClickable ? handleButtonClick : undefined}
            style={{ cursor: playlistObj.isClickable ? 'pointer' : 'default' }}
          >
            <span css={textEllipsis(1)} data-testid="playlist-title">
              {playlistObj.label}
            </span>
            {playlistObj.isPublicPlaylist && <span>({playlist?.videos.length})</span>}
          </button>
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

  @media screen and (min-width: ${theme.width.large}) {
    font-size: ${theme.fontSizes.base};
  }
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

const pliStyle = (isClickable: boolean) => css`
  display: flex;
  max-width: 200px;
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.small};
  background: none;
  cursor: pointer;
  text-decoration: ${isClickable ? 'underline' : 'none'};
`;

export default Post;
