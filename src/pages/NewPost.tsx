import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CloseHeader from '@/components/layout/header/CloseHeader';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { useAuth } from '@/hooks/useAuth';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useToastStore } from '@/stores/toastStore';

const NewPost = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('pli');
  const videoId = searchParams.get('videoId');
  const navigate = useNavigate();
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(false);
  const [description, setDescription] = useState('');
  const createPostMutation = useCreatePost();
  const user = useAuth();
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    setIsShareButtonEnabled(!!description.trim());
  }, [description]);

  const handleOnClose = () => {
    navigate(-1);
  };

  const handleOnShare = () => {
    if (isShareButtonEnabled && user && playlistId && videoId) {
      createPostMutation.mutate(
        { playlistId, videoId, description },
        {
          onSuccess: () => {
            navigate(`/`);
            addToast('새 포스트가 등록되었습니다.');
          },
          onError: (error) => {
            console.error('포스트 및 플레이리스트 업데이트 실패: ', error);
            addToast('포스트 등록에 실패했습니다.');
          },
        },
      );
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <CloseHeader
        onCloseClick={handleOnClose}
        title="새 포스트"
        rightButtonText="공유하기"
        onRightButtonClick={handleOnShare}
        rightButtonDisabled={!isShareButtonEnabled}
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
    </>
  );
};

const textareaStyle = css`
  height: 100px;
  padding: 16px 8px 0;
`;

export default NewPost;
