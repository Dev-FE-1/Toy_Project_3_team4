import { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import PlaylistContentsItem from '@/components/playlistDetail/PlaylistContentsItem';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';

interface PlaylistContentsProps {
  videos: VideoModel[];
  isDraggable?: boolean;
  onVideoSelect: (videoId: string) => void;
  selectedVideoId: string | null;
  isOwner: boolean;
}

const PlaylistContents: React.FC<PlaylistContentsProps> = ({
  videos: initialVideos,
  onVideoSelect,
  selectedVideoId,
  isDraggable = false,
  isOwner,
}) => {
  const [videos, setVideos] = useState(initialVideos);
  const listRef = useRef<HTMLUListElement>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newVideos = Array.from(videos);
    const [reorderedItem] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, reorderedItem);

    setVideos(newVideos);
    // 서버에 새 순서 저장
  };

  if (!isDraggable || !isOwner) {
    return (
      <ul css={playlistStyle} ref={listRef}>
        {videos.map((video) => (
          <PlaylistContentsItem
            key={video.videoId}
            video={video}
            isSelected={video.videoId === selectedVideoId}
            onVideoSelect={onVideoSelect}
            isDraggable={isDraggable}
          />
        ))}
      </ul>
    );
  }

  const renderDraggableItem = (video: VideoModel, index: number) => (
    <Draggable key={video.videoId} draggableId={video.videoId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          css={css`
            ${dragItemStyle}
            ${snapshot.isDragging && draggedItemStyle}
          `}
        >
          <PlaylistContentsItem
            video={video}
            isSelected={video.videoId === selectedVideoId}
            onVideoSelect={onVideoSelect}
            isDraggable={isDraggable}
          />
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="playlist">
        {(provided) => (
          <ul
            css={[playlistStyle, droppableStyle]}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {videos.map((video, index) => renderDraggableItem(video, index))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const playlistStyle = css`
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  margin-top: 24px;
`;

const droppableStyle = css`
  position: relative;
`;

const dragItemStyle = css`
  border-radius: 12px;
  touch-action: none;
  user-select: none;
`;

const draggedItemStyle = css`
  z-index: ${theme.zIndex.base};
  background-color: ${theme.colors.bgGray};
`;

export default PlaylistContents;
