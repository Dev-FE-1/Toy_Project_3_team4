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
    end: (draggedItem: DraggedItemModel, monitor) => {
      if (!monitor.didDrop() && ref.current) {
        onMove(draggedItem.index, itemIndex, true);
      }
    },
  });

  const [, drop] = useDrop({
    accept: dragType,
    hover: (draggingItem: DraggedItemModel, monitor) => {
      if (!ref.current || draggingItem.index === itemIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const overlapArea = calculateOverlapArea(hoverBoundingRect, clientOffset);
      const hoverArea = hoverBoundingRect.width * hoverBoundingRect.height;
      const thresholdArea = hoverArea * 0.1;

      if (overlapArea > thresholdArea) {
        onMove(draggingItem.index, itemIndex, false);
        draggingItem.index = itemIndex;
      }
    },
    drop: (draggedItem: DraggedItemModel) => {
      onMove(draggedItem.index, itemIndex, true);
    },
  });

  drag(drop(ref));

  return { ref, isDragging };
};

const calculateOverlapArea = (
  hoverBoundingRect: DOMRect,
  clientOffset: { x: number; y: number },
) => {
  const draggedItemRect = {
    left: clientOffset.x,
    right: clientOffset.x + hoverBoundingRect.width,
    top: clientOffset.y,
    bottom: clientOffset.y + hoverBoundingRect.height,
  };

  const overlapX = Math.max(
    0,
    Math.min(hoverBoundingRect.right, draggedItemRect.right) -
      Math.max(hoverBoundingRect.left, draggedItemRect.left),
  );
  const overlapY = Math.max(
    0,
    Math.min(hoverBoundingRect.bottom, draggedItemRect.bottom) -
      Math.max(hoverBoundingRect.top, draggedItemRect.top),
  );

  return overlapX * overlapY;
};
