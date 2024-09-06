import { forwardRef } from 'react';

import { css } from '@emotion/react';

import PlaylistContentsItem from '@/components/playlistDetail/PlaylistContentsItem';
import { VideoModel } from '@/types/playlist';
interface DraggablePlaylistItemProps {
  video: VideoModel;
  isDragging: boolean;
}

const DraggablePlaylistItem = forwardRef<HTMLLIElement, DraggablePlaylistItemProps>(
  ({ video, isDragging }, ref) => {
    return (
      <PlaylistContentsItem
        video={video}
        onVideoSelect={() => {}}
        ref={ref}
        isDraggable={true}
        customStyle={draggableStyle(isDragging)}
      />
    );
  },
);

const draggableStyle = (isDragging: boolean) => css`
  position: relative;
  list-style: none;
  opacity: ${isDragging ? 0 : 1};
  cursor: ${isDragging ? 'grabbing' : 'grab'};
  box-shadow: none;

  &:hover {
    z-index: 1;
  }
`;

export default DraggablePlaylistItem;
