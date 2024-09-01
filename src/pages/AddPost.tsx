import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CloseHeader from '@/components/layout/header/CloseHeader';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { errorMessageStyle } from '@/styles/input';
import theme from '@/styles/theme';

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
      navigate(`/post/add/newpost?pli=${playlistId}&videoId=${videoId}`);
    }
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

  const extractVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const validateVideoId = async (id: string) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      );
      return response.ok;
    } catch (error) {
      console.warn('비디오 아이디 검증 실패', error);
      return false;
    }
  };

  return (
    <>
      <CloseHeader
        onCloseClick={handleOnClose}
        title="동영상 링크"
        rightButtonText="완료"
        onrightButtonClick={handleOnShare}
        rightButtonDisabled={!videoId || !playlistId}
      />
      <div css={addPostContainer}>
        <div className="inputContainer">
          <input
            placeholder="YouTube 동영상 링크를 입력해주세요."
            onChange={handleInputChange}
            value={inputUrl}
          />
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        <p>플리 선택</p>
        <button
          onClick={() =>
            navigate(`/post/add/selectpli?videoId=${videoId}`, { state: { type: 'byLink' } })
          }
        >
          {playlistTitle}
        </button>
        <div className="thumbnailWrapper">
          {videoId && videoId !== 'null' && (
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Video Thumbnail"
              css={thumbnailImage}
            />
          )}
        </div>
      </div>
    </>
  );
};

const addPostContainer = css`
  padding: 0 16px;
  font-family: Pretendard;
  & .inputContainer {
    margin-bottom: 16px;
  }
  & > p {
    margin: 0;
    font-size: ${theme.fontSizes.micro};
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

  & .thumbnailWrapper {
    height: 190px;
    flex-shrink: 0;
    border-radius: 16px;
    background: ${theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

const thumbnailImage = css`
  width: 100%;
  height: auto;
  border-radius: 16px;
`;

const errorMessage = errorMessageStyle;

export default AddPostPage;
