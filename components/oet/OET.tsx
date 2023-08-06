"use client";

import { useEffect, useState } from "react";
import AnvilSteps from "./AnvilSteps";
import ItemPicker from "./ItemPicker";
import { ActiveItem, Item } from "lib/types";
import ActiveItemsList from "./ActiveItemsList";
import { nanoid } from "nanoid";
import { AnvilContextProvider } from "hooks/useAnvil";
import { prettyItem } from "lib/utils";

export default function OET() {
  const [activeItems, setActiveItems] = useState<ActiveItem[]>([]);
  const [uniqueItem, setUniqueItem] = useState<Item | undefined>(undefined);

  useEffect(() => {
    // console.log("Active items:");
    // activeItems.forEach((i) => console.log(prettyItem(i)));
    // console.log("\n\n");
  }, [activeItems]);

  function handleItemPickerClick(item: Item) {
    if (!uniqueItem && item.name !== "book") {
      console.log("Setting unique item to", item);
      setUniqueItem(item);
    }

    setActiveItems([
      ...activeItems,
      {
        id: nanoid(),
        name: item.name,
        enchantments: [],
        anvilUses: 0,
      },
    ]);
  }

  function updateItem(id: string, updatedItem: Partial<ActiveItem>) {
    setActiveItems(
      activeItems.map((i) => {
        if (i.id !== id) {
          return i;
        }

        return {
          ...i,
          ...updatedItem,
        };
      })
    );
  }

  function deleteItem(id: string) {
    const deletedItem = activeItems.find((i) => i.id === id);
    setActiveItems(activeItems.filter((i) => i.id !== id));

    if (uniqueItem?.name === deletedItem?.name) {
      setUniqueItem(undefined);
    }
  }

  return (
    <AnvilContextProvider>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-center">
            <span className="font-semibold">(1)</span> Choose Items
          </h2>
          <ItemPicker
            // items={activeItems}
            uniqueItem={uniqueItem}
            onItemClick={handleItemPickerClick}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-center">
            <span className="font-semibold">(2)</span> Add Enchantments
          </h2>
          <ActiveItemsList
            items={activeItems}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-center">
            <span className="font-semibold">(3)</span> Combine!
          </h2>
          <AnvilSteps items={activeItems} />
        </div>
      </div>
    </AnvilContextProvider>
  );
}
