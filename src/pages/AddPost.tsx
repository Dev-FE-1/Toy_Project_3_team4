import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HiOutlineLink } from 'react-icons/hi2';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CloseHeader from '@/components/layout/header/CloseHeader';
import VideoThumbnail from '@/components/playlist/VideoThumbnail';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useToastStore } from '@/stores/toastStore';
import { errorMessageStyle } from '@/styles/input';
import theme from '@/styles/theme';
import { extractVideoId, validateVideoId } from '@/utils/youtubeUtils';

const AddPostPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const playlistId = searchParams.get('pli');
  const playlistTitle = searchParams.get('title') || '분류되지 않은 목록';
  const initialVideoId = searchParams.get('videoId');

  const { data: myPlaylists } = useUserPlaylists();
  const [inputUrl, setInputUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string | null>(initialVideoId || null);
  const [error, setError] = useState<string | null>(null);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (!playlistId && myPlaylists) {
      const defaultPlaylist = myPlaylists.find((pl) => pl.title === '분류되지 않은 목록');
      if (defaultPlaylist) {
        setSearchParams({
          pli: defaultPlaylist.playlistId,
          title: defaultPlaylist.title,
          videoId: videoId || '',
        });
      }
    }
  }, [playlistId, myPlaylists, setSearchParams, videoId]);

  useEffect(() => {
    if (initialVideoId && initialVideoId !== 'null') {
      setInputUrl(`https://www.youtube.com/watch?v=${initialVideoId}`);
    } else {
      setInputUrl('');
      setVideoId(null);
    }
  }, [initialVideoId]);

  const handleOnClose = () => navigate('/');

  const handleOnShare = () => {
    if (videoId && playlistId) {
      navigate(`/post/add/newPost?pli=${playlistId}&videoId=${videoId}`);
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

  return (
    <>
      <CloseHeader
        onCloseClick={handleOnClose}
        title="동영상 추가"
        rightButtonText="완료"
        onRightButtonClick={handleOnShare}
        rightButtonDisabled={!videoId || !playlistId}
      />
      <div css={addPostContainer}>
        <div className="input-container">
          <input
            placeholder="YouTube 동영상 링크를 입력해주세요."
            onChange={handleInputChange}
            value={inputUrl}
          />
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        <p className="label">플리 선택</p>
        <button
          onClick={() =>
            navigate(`/post/add/selectpli?videoId=${videoId}`, { state: { type: 'byLink' } })
          }
        >
          {playlistTitle}
        </button>
        <div className="thumbnail-wrapper">
          <VideoThumbnail
            url={
              videoId && videoId !== 'null'
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : ''
            }
            isPublic={true}
            customStyle={thumbnailStyle}
          />
          {(!videoId || videoId === 'null') && <HiOutlineLink size={32} />}
        </div>
      </div>
    </>
  );
};

const addPostContainer = css`
  font-family: Pretendard;
  & .input-container {
    margin-bottom: 16px;
    padding: 0 8px;
  }
  & > p {
    margin: 0;
    font-size: ${theme.fontSizes.micro};
    padding-left: 8px;
  }
  & > button {
    font-size: ${theme.fontSizes.small};
    margin: 8px 0 16px;
    width: 100%;
    display: flex;
    height: 36px;
    padding: 4px 14px;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray};
    background: white;
    color: #475569;
  }

  & .thumbnail-wrapper {
    position: relative;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const thumbnailStyle = css`
  .image-container {
    position: relative;
    background: ${theme.colors.lightGray};
  }
`;

const errorMessage = errorMessageStyle;

export default AddPostPage;
