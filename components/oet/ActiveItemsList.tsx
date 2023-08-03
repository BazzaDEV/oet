import { ActiveItem } from "lib/types";
import ActiveItemCard from "./ActiveItemCard";

interface ActiveItemsListProps {
  items: ActiveItem[];
  updateItem: (id: string, updatedItem: Partial<ActiveItem>) => void;
  deleteItem: (id: string) => void;
}

export default function ActiveItemsList({
  items,
  updateItem,
  deleteItem,
}: ActiveItemsListProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {items.map((i) => (
        <ActiveItemCard
          key={i.id}
          item={i}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}
