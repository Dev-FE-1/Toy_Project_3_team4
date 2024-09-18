import { useState, useMemo } from 'react';

import { css } from '@emotion/react';
import { HiOutlineBookmark, HiOutlinePlay } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import FullModal from '@/components/common/modals/FullModal';
import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import BackHeader from '@/components/layout/header/BackHeader';
import CloseHeader from '@/components/layout/header/CloseHeader';
import AddPlaylistButton from '@/components/playlist/AddPlaylistButton';
import Playlists from '@/components/playlist/Playlists';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useModalWithOverlay } from '@/hooks/useModalWithOverlay';
import { useUserPlaylists } from '@/hooks/usePlaylists';
import { useAddPlaylist } from '@/hooks/usePostPlaylist';
import { useSubscribedPlaylists } from '@/hooks/useSubscribedPlaylists';
import { useAddVideosToMyPlaylist } from '@/hooks/useVideoToPlaylist';
import SelectVideoPage from '@/pages/SelectVideo';
import { useToastStore } from '@/stores/toastStore';
import theme from '@/styles/theme';
import { PlaylistModel, VideoModel } from '@/types/playlist';
import { makeVideoObj } from '@/utils/video';

const tabs = [
  { id: 'my', label: '내 플리', icon: <HiOutlineBookmark /> },
  { id: 'subscribe', label: '구독한 플리', icon: <HiOutlinePlay /> },
];

interface SelectPliPageProps {
  onClose?: () => void;
  onSelectPlaylist?: (id: string, title: string) => void;
  type?: 'byLink' | 'fromPli';
  onCompleteSelectVideo?: (playlistId: string, videoId: string) => void;
}

const SelectPliPage: React.FC<SelectPliPageProps> = ({
  onClose = () => {},
  onSelectPlaylist,
  type,
  onCompleteSelectVideo,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const navigate = useNavigate();
  const user = useAuth();
  const { data: myPlaylists, error } = useUserPlaylists();
  const { data: subscribedPlaylists } = useSubscribedPlaylists();
  const addPlaylistMutation = useAddPlaylist();
  const videoId = useParams<{ videoId: string }>().videoId;
  const videoObj = makeVideoObj(videoId || '');
  const addToast = useToastStore((state) => state.addToast);
  const addVideoToPlaylistMutation = useAddVideosToMyPlaylist();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const {
    isOpen: isSelectVideoModalOpen,
    open: openSelectVideoModal,
    close: closeSelectVideoModal,
  } = useModalWithOverlay('selectVideoModal', 'selectPli');

  const isVideoInPlaylist = useMemo(() => {
    return (playlist: PlaylistModel) =>
      playlist.videos.some((video: VideoModel) => video.videoId === videoObj.videoId);
  }, [videoObj.videoId]);

  const filteredPlaylists = useMemo(() => {
    return (myPlaylists || []).map((playlist) => ({
      ...playlist,
      containsVideo: isVideoInPlaylist(playlist),
    }));
  }, [myPlaylists, isVideoInPlaylist]);

  const handleAddPlaylist = (title: string, isPublic: boolean) => {
    addPlaylistMutation.mutate({ title, isPublic });
    addToast('새로운 플리를 추가했습니다.');
  };

  const handlePlaylistClick = (playlistId: string, title: string, containsVideo: boolean) => {
    if (type === 'fromPli') {
      setSelectedPlaylistId(playlistId);
      openSelectVideoModal();
    } else if (type === 'byLink') {
      if (onSelectPlaylist) {
        onSelectPlaylist(playlistId, title);
      }
    } else if (videoId && !containsVideo) {
      addVideoToPlaylistMutation.mutate(
        { playlistId, videos: [videoObj] },
        {
          onSuccess: () => {
            addToast('동영상이 플레이리스트에 추가되었습니다.');
            navigate(`${PATH.PLAYLIST}/${playlistId}`);
          },
          onError: () => {
            addToast('동영상 추가에 실패했습니다.');
          },
        },
      );
    } else if (!containsVideo) {
      navigate(`${PATH.PLAYLIST}/${playlistId}`);
    }
  };

  const handleCloseClick = (type?: string | undefined) => {
    if (type) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleCompleteSelectVideo = (playlistId: string, videoId: string) => {
    closeSelectVideoModal();
    onClose();
    onCompleteSelectVideo && onCompleteSelectVideo(playlistId, videoId);
  };

  if (!user) {
    return <p>Please log in to view your playlists.</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div css={selectPliStyle}>
        {type === 'fromPli' ? (
          <CloseHeader
            title="플리 선택"
            onCloseClick={handleCloseClick}
            rightButtonText=""
            usePortal={false}
          />
        ) : (
          <BackHeader
            title={type ? '플리 선택' : '저장할 플리 선택'}
            onBackClick={() => handleCloseClick(type)}
            usePortal={false}
          />
        )}
        <div css={contentStyle}>
          {videoId || type === 'byLink' ? (
            <>
              <AddPlaylistButton
                customStyle={addPlaylistButtonStyle}
                onAddPlaylist={handleAddPlaylist}
              />
              <Playlists
                playlists={filteredPlaylists}
                customStyle={playlistStyle}
                customVideoStyle={videoStyle}
                onPlaylistClick={(id, title, containsVideo) =>
                  handlePlaylistClick(id, title, containsVideo)
                }
                isColumn={false}
                disabledPlaylists={!type && videoId ? true : false}
              />
            </>
          ) : (
            <TabMenu tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
              <TabContent id="my" activeTabId={activeTab}>
                <Playlists
                  playlists={filteredPlaylists.filter((playlist) => playlist.videos.length > 0)}
                  customStyle={playlistStyle}
                  customVideoStyle={videoStyle}
                  onPlaylistClick={(id, title, containsVideo) =>
                    handlePlaylistClick(id, title, containsVideo)
                  }
                  isColumn={false}
                  disabledPlaylists={false}
                />
              </TabContent>
              <TabContent id="subscribe" activeTabId={activeTab}>
                <Playlists
                  playlists={subscribedPlaylists || []}
                  customStyle={playlistStyle}
                  customVideoStyle={videoStyle}
                  onPlaylistClick={(id, title) => handlePlaylistClick(id, title, false)}
                  isColumn={false}
                  disabledPlaylists={false}
                />
              </TabContent>
            </TabMenu>
          )}
        </div>
      </div>
      <FullModal isOpen={isSelectVideoModalOpen} onClose={closeSelectVideoModal}>
        <SelectVideoPage
          playlistId={selectedPlaylistId || ''}
          onClose={closeSelectVideoModal}
          onCloseSelectPli={onClose}
          onCompleteSelectVideo={handleCompleteSelectVideo}
        />
      </FullModal>
    </>
  );
};

const selectPliStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const contentStyle = css`
  flex: 1;
  overflow-y: auto;
`;

const addPlaylistButtonStyle = css`
  margin-bottom: 24px;
`;

const playlistStyle = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .playlist-info {
    @media screen and (min-width: ${theme.width.large}) {
      margin-left: 12px;
    }
  }

  .disabled-playlist {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const videoStyle = css`
  width: 100px;
  height: auto;
  flex-shrink: 0;

  .image-container {
    border-radius: 8px;
  }

  @media screen and (min-width: ${theme.width.large}) {
    width: 110px;
  }
`;

export default SelectPliPage;
