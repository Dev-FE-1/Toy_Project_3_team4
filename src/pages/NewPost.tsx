import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { collection, addDoc, setDoc, updateDoc, getDoc, doc, arrayUnion } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { db } from '@/api/firebaseApp';
import CloseHeader from '@/components/layout/header/CloseHeader';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';

const NewPost = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('pli');
  const videoId = searchParams.get('videoId');
  const navigate = useNavigate();
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(false);
  const [description, setDescription] = useState('');
  const user = useAuth();

  useEffect(() => {
    setIsShareButtonEnabled(!!description.trim());
  }, [description]);

  const handleOnClose = () => {
    navigate(-1);
  };

  const handleOnShare = async () => {
    if (isShareButtonEnabled && user) {
      if (!playlistId || !videoId) {
        return;
      }

      try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const postsCollection = collection(db, 'posts');
        const postDocRef = await addDoc(postsCollection, {
          content: description,
          createdAt: new Date(),
          likes: [],
          playlistId,
          userId: user.uid,
          video: videoUrl,
        });

        await updateDoc(postDocRef, { postId: postDocRef.id });

        const playlistsCollection = collection(db, 'playlists');
        const playlistDocRef = doc(playlistsCollection, playlistId);
        const playlistSnapshot = await getDoc(playlistDocRef);

        const videoData = {
          videoId: videoId,
          thumbnailUrl: videoThumbnailUrl,
          videoUrl: videoUrl,
        };

        if (!playlistSnapshot.exists()) {
          await setDoc(playlistDocRef, {
            playlistId: playlistId,
            videos: [videoData],
            createdAt: new Date(),
            createdBy: user.uid,
          });
        } else {
          const playlistData = playlistSnapshot.data();
          const videos = playlistData.videos || [];

          const videoExists = videos.some(
            (video: { videoId: string }) => video.videoId === videoId,
          );

          if (!videoExists) {
            await updateDoc(playlistDocRef, {
              videos: arrayUnion(videoData),
            });
          }
        }

        navigate(`/`);
      } catch (error) {
        console.error('포스트 및 플레이리스트 업데이트 실패: ', error);
      }
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
        onrightButtonClick={handleOnShare}
        rightButtonDisabled={!isShareButtonEnabled}
      />
      <div>
        {videoId && (
          <div css={thumbnailContainer}>
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Video Thumbnail"
              css={thumbnailStyle}
            />
          </div>
        )}
        <textarea
          placeholder="동영상에 대한 이야기를 적어주세요"
          css={textareaStyle}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </>
  );
};

const thumbnailContainer = css`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const thumbnailStyle = css`
  width: 100%;
  max-width: 400px;
  height: 220px;
  border-radius: 16px;
`;

const textareaStyle = css`
  width: 100%;
  height: 100px;
  padding: 0 8px;
  font-size: ${theme.fontSizes.base};
  resize: none;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
`;

export default NewPost;
