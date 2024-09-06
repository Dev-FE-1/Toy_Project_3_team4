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
import FullButton from '@/components/common/buttons/FullButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import Modal from '@/components/common/Modal';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import UserInfo from '@/components/user/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import { useUpdatePlaylist } from '@/hooks/usePostPlaylist'; // 업데이트 훅 포함
import { useSubscribePlaylist, useUnsubscribePlaylist } from '@/hooks/useSubscribePlaylist';
import { useUserById } from '@/hooks/useUserById';
import { useDeletePlaylist } from '@/hooks/useVideoToPlaylist';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

interface PlaylistInfoProps {
  playlist: PlaylistModel;
  user: UserModel;
  customStyle?: SerializedStyles;
  isOwner: boolean;
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist, user, customStyle, isOwner }) => {
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
    navigate('/playlists');
  };

  return (
    <div css={[playlistInfoStyle, customStyle]}>
      <VideoThumbnail
        url={videos[0]?.thumbnailUrl}
        isPublic={isPublic}
        customLabelStyle={labelStyle}
        customStyle={thumbnailStyle}
      />
      <div className="info-container">
        <div className="title">
          <h1>
            {title}
            {isOwner && <HiOutlinePencil css={iconStyle} onClick={handleOpenEditModal} />}
          </h1>
          {!isOwner && (
            <FitButton
              styleType={!isSubscribed ? 'primary' : 'secondary'}
              onClick={handleSubscribeToggle}
            >
              {isSubscribed ? '구독 중' : '구독'}
            </FitButton>
          )}
          {isOwner && (
            <HiEllipsisVertical css={verticalButtonStyle} onClick={handleOpenOptionsModal} />
          )}
        </div>
        <div className="info-footer">
          <UserInfo name={user.displayName} url={user.photoURL} />
          <span className="video-count">{videos.length}개의 동영상</span>
        </div>
      </div>

      {/* 수정 모달 */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title="플리 수정하기">
        <div css={editModalContentContainer}>
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="플리 제목을 입력하세요"
          />
          <div className="toggleStyle">
            전체 공개
            <ToggleButton enabled={isPublicPlaylist} setEnabled={setIsPublicPlaylist} />
          </div>
          <FullButton styleType="primary" onClick={handleUpdatePlaylist}>
            수정하기
          </FullButton>
          <FullButton styleType="cancel" onClick={handleCloseEditModal}>
            취소하기
          </FullButton>
        </div>
      </Modal>

      {/* 옵션 모달 */}
      <Modal isOpen={isOptionsModalOpen} onClose={handleCloseOptionsModal} title={null}>
        <div css={optionsModalContentContainer}>
          <div onClick={handleAddVideo}>
            <div className="icon-wrapper">
              <HiOutlineBookmark />
            </div>
            플리에 동영상 추가하기
          </div>
          <div onClick={handleDeletePlaylist}>
            <div className="icon-wrapper">
              <HiOutlineTrash />
            </div>
            플리 삭제하기
          </div>
        </div>
      </Modal>
    </div>
  );
};

const playlistInfoStyle = css`
  .info-container {
    padding: 12px 8px 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      h1 {
        font-size: ${theme.fontSizes.large};
        display: flex;
        align-items: center;
      }
    }
  }

  .info-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
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

const thumbnailStyle = css`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

const iconStyle = css`
  margin-left: 8px;
  font-size: 18px;
  cursor: pointer;
`;

const verticalButtonStyle = css`
  font-size: 24px;
  cursor: pointer;
`;

const editModalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;
  }

  & .titleStyle {
    color: ${theme.colors.darkGray};
    font-size: ${theme.fontSizes.base};
    padding: 8px;
    width: 100%;
    border-radius: 4px;
  }

  & .toggleStyle {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
  }
`;

const optionsModalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;

    .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: ${theme.colors.lightestGray};
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;

      svg {
        height: 18px;
        width: 18px;
      }
    }
  }
`;

export default PlaylistInfo;
