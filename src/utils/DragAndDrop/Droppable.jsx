import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

import "./Droppable.scss";

export function Droppable({ id, items }) {
  const { setNodeRef } = useDroppable({ id });

  
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {items.map((item, index) => (
          <SortableItem key={index} id={item} name={item}/>
        ))}
      </ul>
    </SortableContext>
  );
};

