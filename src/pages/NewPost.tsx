import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import CloseHeader from '@/components/layout/header/CloseHeader';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { useAuth } from '@/hooks/useAuth';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useModifyPost } from '@/hooks/useModifyPost';
import { useAddVideosToMyPlaylist } from '@/hooks/useVideoToPlaylist';
import { useToastStore } from '@/stores/toastStore';
import { makeVideoObj } from '@/utils/video';

interface NewPostProps {
  playlistId?: string;
  videoId?: string;
  onClose?: () => void;
  initialDescription?: string;
  isEditing?: boolean;
  postId?: string;
}

const NewPost: React.FC<NewPostProps> = ({
  playlistId,
  videoId,
  onClose,
  initialDescription = '',
  isEditing = false,
  postId = '',
}) => {
  const navigate = useNavigate();
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useModifyPost();
  const user = useAuth();
  const addToast = useToastStore((state) => state.addToast);
  const videoObject = makeVideoObj(videoId || '');
  const addVideoToPlaylistMutation = useAddVideosToMyPlaylist();

  useEffect(() => {
    setIsShareButtonEnabled(!!description.trim());
  }, [description]);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleButtonClick = () => {
    if (isShareButtonEnabled && user && playlistId && videoId) {
      if (isEditing) {
        updatePostMutation.mutate(
          { postId, description },
          {
            onSuccess: () => {
              addToast('포스트가 수정되었습니다.');
              onClose ? onClose() : null;
            },
            onError: (error) => {
              console.error('포스트 수정 실패:', error);
              addToast('포스트 수정에 실패했습니다.');
            },
          },
        );
      } else {
        addVideoToPlaylistMutation.mutate({ playlistId, videos: [videoObject] });
        createPostMutation.mutate(
          { playlistId, videoId, description },
          {
            onSuccess: () => {
              navigate(`/`);
              addToast('새 포스트가 등록되었습니다.');
              onClose ? onClose() : null;
            },
            onError: (error) => {
              console.error('포스트 및 플레이리스트 업데이트 실패: ', error);
              addToast('포스트 등록에 실패했습니다.');
            },
          },
        );
      }
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div css={newPostStyle}>
      <CloseHeader
        onCloseClick={handleOnClose}
        title={isEditing ? '포스트 수정' : '새 포스트'}
        rightButtonText={isEditing ? '수정' : '공유'}
        onRightButtonClick={handleButtonClick}
        rightButtonDisabled={!isShareButtonEnabled}
        usePortal={false}
      />
      <div>
        {videoId && (
          <VideoThumbnail
            url={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            isPublic={true}
          />
        )}
        <textarea
          placeholder="동영상에 대한 이야기를 적어주세요"
          css={textareaStyle}
          value={description}
          onChange={handleDescriptionChange}
          data-testid="post-content-input"
        />
      </div>
    </div>
  );
};

const newPostStyle = css`
  width: 100%;
`;

const textareaStyle = css`
  height: 100px;
  padding: 16px 8px 0;
`;

export default NewPost;
