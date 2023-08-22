"use client"

import { useEffect, useState } from "react"
import AnvilSteps from "./AnvilSteps"
import ItemPicker from "./ItemPicker"
import { ActiveItem, AnvilCombination, Item } from "@/lib/types"
import ActiveItemsList from "./ActiveItemsList"
import { nanoid } from "nanoid"
import { useAnvilContext } from "@/hooks/useAnvil"
import CalculateButton from "./CalculateButton"
import { getBestAnvilCombination } from "@/lib/calc"

export default function OET() {
  const { enchantments, edition } = useAnvilContext()

  const [activeItems, setActiveItems] = useState<ActiveItem[]>([])
  const [uniqueItem, setUniqueItem] = useState<Item | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<AnvilCombination | undefined>(undefined)

  useEffect(() => {
    setResult(undefined)
  }, [activeItems])

  function handleItemPickerClick(item: Item) {
    if (!uniqueItem && item.name !== "book") {
      console.log("Setting unique item to", item)
      setUniqueItem(item)
    }

    setActiveItems([
      ...activeItems,
      {
        id: nanoid(),
        name: item.name,
        enchantments: [],
        anvilUses: 0,
      },
    ])
  }

  function updateItem(id: string, updatedItem: Partial<ActiveItem>) {
    setActiveItems(
      activeItems.map((i) => {
        if (i.id !== id) {
          return i
        }

        return {
          ...i,
          ...updatedItem,
        }
      })
    )
  }

  function deleteItem(id: string) {
    const deletedItem = activeItems.find((i) => i.id === id)
    setActiveItems(activeItems.filter((i) => i.id !== id))

    if (uniqueItem?.name === deletedItem?.name) {
      setUniqueItem(undefined)
    }
  }

  function handleCalculateClick() {
    setLoading(true)

    // Do calculation
    const bestCombination = getBestAnvilCombination(activeItems, {
      enchantments,
      edition,
    })

    setResult(bestCombination ?? undefined)

    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl sm:text-3xl text-center">
          <span className="font-semibold">(1)</span> Choose Items
        </h2>
        <ItemPicker
          uniqueItem={uniqueItem}
          onItemClick={handleItemPickerClick}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl sm:text-3xl text-center">
          <span className="font-semibold">(2)</span> Add Enchantments
        </h2>
        <ActiveItemsList
          items={activeItems}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
      <div className="flex flex-col gap-5 items-center">
        <CalculateButton
          onClick={handleCalculateClick}
          disabled={
            loading ||
            !activeItems ||
            activeItems.length < 2 ||
            activeItems.some(
              (i) => i.name === "book" && i.enchantments.length === 0
            )
          }
        />
      </div>
      <AnvilSteps combination={result} />
    </div>
  )
}
