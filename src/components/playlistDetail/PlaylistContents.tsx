import { useState } from 'react';

import { css } from '@emotion/react';

import DragAndDropWrapper from '@/components/dragAndDrop/DragAndDropWrapper';
import DraggablePlaylistItem from '@/components/playlistDetail/DraggablePlaylistItem';
import PlaylistContentsItem from '@/components/playlistDetail/PlaylistContentsItem';
import { DraggableVideoModel, VideoModel } from '@/types/playlist';

interface PlaylistContentsProps {
  videos: VideoModel[];
  isDraggable?: boolean;
}

const PlaylistContents: React.FC<PlaylistContentsProps> = ({
  videos: initialVideos,
  isDraggable = false,
}) => {
  const [videos, setVideos] = useState(getDraggableVideos(initialVideos));

  const onDragEnd = (newOrder: DraggableVideoModel[]) => {
    setVideos(newOrder);
    // 서버에 저장
  };

  if (!isDraggable) {
    return (
      <ul css={playlistStyle}>
        {videos.map((video) => (
          <PlaylistContentsItem key={video.videoId} video={video} />
        ))}
      </ul>
    );
  }
  return (
    <>
      <ul css={playlistStyle}>
        <DragAndDropWrapper dragList={videos} onDragEnd={onDragEnd} dragType="video">
          {(video, ref, isDragging) => (
            <DraggablePlaylistItem video={video} ref={ref} isDragging={isDragging} />
          )}
        </DragAndDropWrapper>
      </ul>
    </>
  );
};

const getDraggableVideos = (videos: VideoModel[]): DraggableVideoModel[] =>
  videos.map((video) => ({ ...video, id: video.videoId }));

const playlistStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0 8px;
  will-change: contents;
  transform: translateZ(0);
`;

export default PlaylistContents;
