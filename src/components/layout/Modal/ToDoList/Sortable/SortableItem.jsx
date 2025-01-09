import React from "react";
import { useSortable } from "@dnd-kit/sortable";

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, });

  const style = {
    transition: transition || "transform 0.2s ease",
    
  };

  console.log("Transform", transform);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
