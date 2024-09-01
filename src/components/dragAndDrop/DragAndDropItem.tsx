import { OnMoveFunction, useDragAndDrop } from '@/hooks/useDragAndDrop';

interface DragAndDropItemProps<Item> {
  dragItem: Item;
  itemIndex: number;
  onMove: OnMoveFunction;
  itemRenderer: (
    item: Item,
    ref: React.RefObject<HTMLElement>,
    isDragging: boolean,
  ) => React.ReactNode;
  dragType: string;
}

const DragAndDropItem = <Item,>({
  dragItem,
  itemIndex,
  onMove,
  itemRenderer,
  dragType,
}: DragAndDropItemProps<Item>) => {
  const { ref, isDragging } = useDragAndDrop({ itemIndex, onMove, dragType });

  return <>{itemRenderer(dragItem, ref, isDragging)}</>;
};

export default DragAndDropItem;
