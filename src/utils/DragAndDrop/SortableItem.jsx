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

  //console.log(CSS);
  const style = {
    //transform: CSS.Transform.toString(transform),
    //transform: CSS.Translate.toString(transform) === `translate3d(${translate.x}, ${translate.y}, 0)`,
    //transform: CSS.Transform.toString(`translate3d(${transform}, ${transform}, 0)`),
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
