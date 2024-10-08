import { useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePlus } from 'react-icons/hi2';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import FitButton from '@/components/common/buttons/FitButton';
import CloseHeader from '@/components/layout/header/CloseHeader';
import SelectablePlaylistItem from '@/components/playlistDetail/SelectablePlaylistItem';
import { usePlaylistById } from '@/hooks/usePlaylists';
import { useAddVideosToPlaylist } from '@/hooks/useVideoToPlaylist';
import { useToastStore } from '@/stores/toastStore';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';
import { extractVideoId, validateVideoId } from '@/utils/youtubeUtils';

const AddVideosPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistId = useParams<{ id: string }>().id ?? '';
  const [inputUrl, setInputUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const addToast = useToastStore((state) => state.addToast);
  const { data: playlist } = usePlaylistById(playlistId);
  const { mutate: addVideosToPlaylist, isPending } = useAddVideosToPlaylist(playlistId);
  const handleOnClose = () =>
    navigate(`/playlist/${playlistId}`, { state: { from: '/addVideos' } });

  const handleOnAdd = () => {
    if (playlistId && videos.length > 0) {
      addVideosToPlaylist(videos, {
        onSuccess: () => {
          navigate(`/playlist/${playlistId}`, {
            state: { from: '/playlist' },
          });
        },
        onError: (error) => {
          console.error('비디오 추가 실패: ', error);
          setError('비디오를 추가하는 중 오류가 발생했습니다.');
        },
      });
    }
    addToast('동영상이 추가되었습니다.');
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);

    if (!url) {
      setVideoId(null);
      setError(null);
      return;
    }

    const id = extractVideoId(url);
    if (id) {
      const isValid = await validateVideoId(id);
      if (isValid) {
        setVideoId(id);
        setError(null);
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), videoId: id });
      } else {
        setVideoId(null);
        setError('올바른 YouTube 링크가 아닙니다');
      }
    } else {
      setVideoId(null);
      setError('올바른 YouTube 링크가 아닙니다');
    }
  };

  const handleAddVideo = () => {
    if (videoId) {
      const alreadyAdded = videos.some((video) => video.videoId === videoId);
      const alreadyAddedInPlaylist = playlist?.videos.some((video) => video.videoId === videoId);
      if (alreadyAdded || alreadyAddedInPlaylist) {
        setError('이미 추가된 비디오입니다.');
        return;
      }

      const newVideo: VideoModel = {
        videoId,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
      setVideos([...videos, newVideo]);
      setInputUrl('');
      setVideoId(null);
      setError(null);
    }
  };

  return (
    <>
      <CloseHeader
        onCloseClick={handleOnClose}
        title="동영상 추가"
        rightButtonText="완료"
        onRightButtonClick={handleOnAdd}
        rightButtonDisabled={isPending || videos.length === 0}
        data-testid="add-video-header"
      />
      <div css={addPostContainer}>
        <div className="inputContainer">
          <input
            placeholder="YouTube 동영상 링크를 입력해주세요."
            onChange={handleInputChange}
            value={inputUrl}
          />
          <FitButton
            onClick={handleAddVideo}
            styleType={!videoId || isPending ? 'secondary' : 'primary'}
            customStyle={addButtonStyle}
          >
            <HiOutlinePlus size={20} />
          </FitButton>
        </div>
        {error && <div css={errorMessage}>{error}</div>}
        <ul css={videosListStyle}>
          {videos.map((video) => (
            <SelectablePlaylistItem
              key={video.videoId}
              video={video}
              isSelected={false}
              onVideoSelect={() => {}}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const addPostContainer = css`
  & .inputContainer {
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      margin-right: 10px;
      padding: 8px 12px;
      font-size: ${theme.fontSizes.base};
      border-radius: 4px;
    }
  }
`;

const videosListStyle = css`
  list-style: none;
  padding: 0;
`;

const addButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
`;

const errorMessage = css`
  color: ${theme.colors.alertRed};
  font-size: ${theme.fontSizes.micro};
  margin-left: 12px;
`;

export default AddVideosPage;
