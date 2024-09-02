import { useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

export type OnMoveFunction = (dragIndex: number, hoverIndex: number, isFinished: boolean) => void;

interface UseDragAndDropProps {
  itemIndex: number;
  onMove: OnMoveFunction;
  dragType: string;
}

interface DraggedItemModel {
  type: string;
  index: number;
}

export const useDragAndDrop = ({ itemIndex, onMove, dragType }: UseDragAndDropProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: dragType,
    item: { type: dragType, index: itemIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: dragType,
    hover: (draggingItem: DraggedItemModel, monitor) => {
      if (!ref.current || draggingItem.index === itemIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (draggingItem.index < itemIndex && hoverClientY < hoverMiddleY) return;
      if (draggingItem.index > itemIndex && hoverClientY > hoverMiddleY) return;

      onMove(draggingItem.index, itemIndex, false);
      draggingItem.index = itemIndex;
    },
    drop: (draggedItem: DraggedItemModel) => {
      onMove(draggedItem.index, itemIndex, true);
    },
  });

  drag(drop(ref));

  return { ref, isDragging };
};
