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
      {items.length > 0 ? (
        items.map((i) => (
          <ActiveItemCard
            key={i.id}
            item={i}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))
      ) : (
        <div className="flex flex-col gap-2 text-center">
          <span className="italic">{"You haven't picked any items yet!"}</span>

          <span>Start by clicking an item from the list above.</span>
        </div>
      )}
    </div>
  );
}
