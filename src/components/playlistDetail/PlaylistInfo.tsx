import { useState, useEffect } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import {
  HiOutlinePencil,
  HiEllipsisVertical,
  HiOutlineBookmark,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import FitButton from '@/components/common/buttons/FitButton';
import AddFixModal from '@/components/common/modals/AddFixModal';
import OptionModal from '@/components/common/modals/OptionModal';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { useUpdatePlaylist } from '@/hooks/usePostPlaylist';
import { useSubscribePlaylist, useUnsubscribePlaylist } from '@/hooks/useSubscribePlaylist';
import { useUserById } from '@/hooks/useUserById';
import { useDeletePlaylist } from '@/hooks/useVideoToPlaylist';
import { useToastStore } from '@/stores/toastStore';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

interface PlaylistInfoProps {
  playlist: PlaylistModel;
  user: UserModel;
  thumbnailUrl: string;
  isOwner?: boolean;
  customStyle?: SerializedStyles;
  selectPli?: boolean;
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({
  playlist,
  user,
  thumbnailUrl,
  isOwner = false,
  customStyle,
  selectPli = false,
}) => {
  const { title, videos, isPublic } = playlist;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    isOpen: isAddFixModalOpen,
    open: openAddFixModal,
    close: closeAddFixModal,
  } = useModalWithOverlay('addFixModal', playlist?.playlistId);
  const {
    isOpen: isOptionModalOpen,
    open: openOptionModal,
    close: closeOptionModal,
  } = useModalWithOverlay('optionModal', playlist?.playlistId);
  const [newTitle, setNewTitle] = useState(title);
  const [isPublicPlaylist, setIsPublicPlaylist] = useState(isPublic);

  const navigate = useNavigate();

  const subscribeMutation = useSubscribePlaylist(playlist?.playlistId || '');
  const unsubscribeMutation = useUnsubscribePlaylist(playlist?.playlistId || '');
  const deletePlaylistMutation = useDeletePlaylist(playlist?.playlistId || '');
  const updatePlaylistMutation = useUpdatePlaylist(playlist?.playlistId || '');

  const currentUser = useAuth();
  const currentUserData = useUserById(currentUser?.uid ?? null);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (playlist && currentUserData.data?.subscriptions?.includes(playlist.playlistId)) {
      setIsSubscribed(true);
    }
  }, [playlist, currentUserData.data]);

  const handleSubscribeToggle = () => {
    if (isSubscribed) {
      unsubscribeMutation.mutate();
      setIsSubscribed(false);
    } else {
      subscribeMutation.mutate();
      setIsSubscribed(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleUpdatePlaylist = () => {
    updatePlaylistMutation.mutate({ title: newTitle, isPublic: isPublicPlaylist });
    closeAddFixModal();
  };

  const handleAddVideo = () => {
    if (playlist) {
      navigate(`/addVideos/${playlist.playlistId}`);
    }
    closeOptionModal();
  };

  const handleDeletePlaylist = () => {
    deletePlaylistMutation.mutate({ previousPlaylists: undefined });
    closeOptionModal();
    navigate('/playlist');
    addToast('플레이리스트가 삭제되었습니다.');
  };

  const isUnmodifiable = title === '분류되지 않은 목록';

  const optionsModalOptions = [
    {
      label: '플리에 동영상 추가하기',
      Icon: HiOutlineBookmark,
      onClick: handleAddVideo,
    },
    {
      label: '플리 삭제하기',
      Icon: HiOutlineTrash,
      onClick: handleDeletePlaylist,
    },
  ];

  return (
    <div css={[playlistInfoStyle, customStyle]}>
      <VideoThumbnail
        url={thumbnailUrl || videos[0]?.thumbnailUrl}
        isPublic={isPublic}
        customLabelStyle={labelStyle}
      />
      <div className="info-container">
        <div className="title">
          <h1>
            {title}
            {isOwner && !isUnmodifiable && !selectPli && (
              <FitButton
                onClick={openAddFixModal}
                styleType="secondary"
                customStyle={editButtonStyle}
              >
                <HiOutlinePencil size={16} />
              </FitButton>
            )}
          </h1>
          {!isOwner && (
            <FitButton
              styleType={!isSubscribed ? 'primary' : 'secondary'}
              onClick={handleSubscribeToggle}
            >
              {isSubscribed ? '구독중' : '구독'}
            </FitButton>
          )}
          {isOwner && !selectPli && (
            <HiEllipsisVertical css={verticalButtonStyle} onClick={openOptionModal} />
          )}
        </div>
        <div className="info-footer">
          <UserInfo name={user.displayName} url={user.photoURL} userId={user.userId} />
          <span className="video-count">{videos.length}개의 동영상</span>
        </div>
      </div>

      {!isUnmodifiable && (
        <AddFixModal
          isOpen={isAddFixModalOpen}
          onClose={closeAddFixModal}
          title="플리 수정하기"
          inputValue={newTitle}
          onInputChange={handleTitleChange}
          errorMessage={''}
          isPublic={isPublicPlaylist}
          setIsPublic={setIsPublicPlaylist}
          isButtonEnabled={newTitle.trim() !== ''}
          onSubmit={handleUpdatePlaylist}
          isEditing={true}
        />
      )}

      <OptionModal
        isOpen={isOptionModalOpen}
        onClose={closeOptionModal}
        options={isUnmodifiable ? optionsModalOptions.slice(0, 1) : optionsModalOptions}
      />
    </div>
  );
};

const playlistInfoStyle = css`
  > .info-container {
    margin: 8px 0 8px 8px;

    .title {
      display: flex;
      justify-content: space-between;

      h1 {
        font-size: ${theme.fontSizes.large};
      }
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

const editButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  margin-left: 8px;
  border: 1px solid ${theme.colors.lightGray};
  background-color: ${theme.colors.bgGray};
  cursor: pointer;

  svg {
    stroke-width: 2;
  }
`;

const verticalButtonStyle = css`
  font-size: 24px;
  cursor: pointer;
  margin-top: 2px;
`;

export default PlaylistInfo;
