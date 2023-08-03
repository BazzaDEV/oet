"use client";

import { useState } from "react";
import AnvilSteps from "./AnvilSteps";
import ItemPicker from "./ItemPicker";
import { ActiveItem, MinecraftItem } from "lib/types";
import ActiveItemsList from "./ActiveItemsList";
import { nanoid } from "nanoid";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "components/ui/use-toast";

export default function OET() {
  const [items, setItems] = useState<ActiveItem[]>([]);
  const [uniqueItem, setUniqueItem] = useState<MinecraftItem | undefined>(
    undefined
  );

  function handleItemPickerClick(item: MinecraftItem) {
    if (!uniqueItem && item !== MinecraftItem.Book) {
      console.log("Setting unique item to", item);
      setUniqueItem(item);
    }

    setItems([
      ...items,
      {
        id: nanoid(),
        name: item,
        enchantments: [],
        anvilUses: 0,
      },
    ]);
  }

  function updateItem(id: string, updatedItem: Partial<ActiveItem>) {
    setItems(
      items.map((i) => {
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
    const deletedItem = items.find((i) => i.id === id);
    setItems(items.filter((i) => i.id !== id));

    if (uniqueItem === deletedItem?.name) {
      setUniqueItem(undefined);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl">
          <span className="font-semibold">(1)</span> Choose Items
        </h2>
        <ItemPicker
          items={items}
          uniqueItem={uniqueItem}
          onItemClick={handleItemPickerClick}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl">
          <span className="font-semibold">(2)</span> Add Enchantments
        </h2>
        <Alert className="max-w-[700px] mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-semibold tracking-tighter">
            Warnings!
          </AlertTitle>
          <AlertDescription>
            This is a safe space to outline some warnings regarding the chosen
            items and/or enchantments.
          </AlertDescription>
        </Alert>
        <ActiveItemsList
          items={items}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl">
          <span className="font-semibold">(3)</span> Combine!
        </h2>
        <AnvilSteps items={items} />
      </div>
    </div>
  );
}
