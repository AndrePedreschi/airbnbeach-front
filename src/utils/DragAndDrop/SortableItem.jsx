import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "./Item";

export function SortableItem({ id, name }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    
  } = useSortable({ id });

 
  const style = {
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >

      <Item name={name} />
    </li>
  );
};
