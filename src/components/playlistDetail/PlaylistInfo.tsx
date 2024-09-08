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
import AddFixModal from '@/components/common/modals/AddFixModal'; // AddFixModal 사용
import OptionModal from '@/components/common/modals/OptionModal'; // OptionModal 사용
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useUpdatePlaylist } from '@/hooks/usePostPlaylist';
import { useSubscribePlaylist, useUnsubscribePlaylist } from '@/hooks/useSubscribePlaylist';
import { useUserById } from '@/hooks/useUserById';
import { useDeletePlaylist } from '@/hooks/useVideoToPlaylist';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

interface PlaylistInfoProps {
  playlist: PlaylistModel;
  user: UserModel;
  thumbnailUrl: string;
  isOwner: boolean;
  customStyle?: SerializedStyles;
  selectPli: boolean;
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({
  playlist,
  user,
  thumbnailUrl,
  isOwner,
  customStyle,
  selectPli,
}) => {
  const { title, videos, isPublic } = playlist;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isPublicPlaylist, setIsPublicPlaylist] = useState(isPublic);

  const navigate = useNavigate();

  const subscribeMutation = useSubscribePlaylist(playlist.playlistId);
  const unsubscribeMutation = useUnsubscribePlaylist(playlist.playlistId);
  const deletePlaylistMutation = useDeletePlaylist(playlist.playlistId);
  const updatePlaylistMutation = useUpdatePlaylist(playlist.playlistId);

  const currentUser = useAuth();
  const currentUserData = useUserById(currentUser?.uid ?? null);

  useEffect(() => {
    if (currentUserData.data?.subscriptions?.includes(playlist.playlistId)) {
      setIsSubscribed(true);
    }
  }, [currentUser, currentUserData.data, playlist.playlistId, user]);

  const handleSubscribeToggle = () => {
    if (isSubscribed) {
      unsubscribeMutation.mutate();
      setIsSubscribed(false);
    } else {
      subscribeMutation.mutate();
      setIsSubscribed(true);
    }
  };

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleOpenOptionsModal = () => setIsOptionsModalOpen(true);
  const handleCloseOptionsModal = () => setIsOptionsModalOpen(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleUpdatePlaylist = () => {
    updatePlaylistMutation.mutate({ title: newTitle, isPublic: isPublicPlaylist });
    handleCloseEditModal();
  };

  const handleAddVideo = () => {
    navigate(`/addVideos/${playlist.playlistId}`);
    handleCloseOptionsModal();
  };

  const handleDeletePlaylist = () => {
    deletePlaylistMutation.mutate();
    handleCloseOptionsModal();
    navigate('/playlist');
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
                onClick={handleOpenEditModal}
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
            <HiEllipsisVertical css={verticalButtonStyle} onClick={handleOpenOptionsModal} />
          )}
        </div>
        <div className="info-footer">
          <UserInfo name={user.displayName} url={user.photoURL} />
          <span className="video-count">{videos.length}개의 동영상</span>
        </div>
      </div>

      {!isUnmodifiable && (
        <AddFixModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="플리 수정하기"
          inputValue={newTitle}
          onInputChange={handleTitleChange}
          errorMessage={''}
          isPublic={isPublicPlaylist}
          setIsPublic={setIsPublicPlaylist}
          isButtonEnabled={newTitle.trim() !== ''}
          onSubmit={handleUpdatePlaylist}
        />
      )}

      <OptionModal
        isOpen={isOptionsModalOpen}
        onClose={handleCloseOptionsModal}
        title={null}
        options={optionsModalOptions}
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
