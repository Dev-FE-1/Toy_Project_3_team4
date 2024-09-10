import { useRef } from 'react';

import { css } from '@emotion/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { updatePlaylistOrder } from '@/api/fetchPlaylist';
import DraggablePlaylistItem from '@/components/playlistDetail/DraggablePlaylistItem';
import theme from '@/styles/theme';
import { VideoModel } from '@/types/playlist';

interface DraggablePlaylistProps {
  playlistId: string;
  videos: VideoModel[];
  setVideos: (videos: VideoModel[]) => void;
  isDraggable?: boolean;
}

const DraggablePlaylist: React.FC<DraggablePlaylistProps> = ({
  playlistId,
  videos,
  setVideos,
  isDraggable = true,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newVideos = Array.from(videos);
    const [reorderedItem] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, reorderedItem);

    setVideos(newVideos);
    updatePlaylistOrder(playlistId, newVideos);
  };

  if (!isDraggable) {
    return (
      <ul css={playlistStyle} ref={listRef}>
        {videos.map((video) => (
          <DraggablePlaylistItem
            key={video.videoId}
            playlistId={playlistId}
            video={video}
            isDraggable={false}
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
          <DraggablePlaylistItem video={video} playlistId={playlistId} />
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
  margin-top: 16px;
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

export default DraggablePlaylist;
