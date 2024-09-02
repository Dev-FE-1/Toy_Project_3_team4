import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragAndDropItem from '@/components/dragAndDrop/DragAndDropItem';

interface DragAndDropWrapperProps<Item> {
  dragList: Item[];
  onDragging?: (newOrder: Item[]) => void;
  onDragEnd: (newOrder: Item[]) => void;
  children: (
    item: Item,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode;
  dragType: string;
}

const DragAndDropWrapper = <Item extends { id: string | number }>({
  dragList,
  onDragging,
  onDragEnd,
  children,
  dragType,
}: DragAndDropWrapperProps<Item>) => {
  const [currentItems, setCurrentItems] = useState<Item[]>(dragList);

  const onMoveItem = (dragIndex: number, hoverIndex: number, isFinished: boolean) => {
    const newItems = [...currentItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setCurrentItems(newItems);

    if (isFinished) {
      onDragEnd(newItems);
    } else {
      onDragging && onDragging(newItems);
    }
  };

  useEffect(() => {
    setCurrentItems(dragList);
  }, [dragList]);

  return (
    <DndProvider backend={HTML5Backend}>
      {currentItems.map((item, idx) => (
        <DragAndDropItem
          key={item.id}
          dragItem={item}
          itemIndex={idx}
          onMove={onMoveItem}
          itemRenderer={children}
          dragType={dragType}
        />
      ))}
    </DndProvider>
  );
};

export default DragAndDropWrapper;
