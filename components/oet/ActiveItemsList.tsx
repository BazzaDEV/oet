import { ActiveItem } from "lib/types"
import ActiveItemCard from "./ActiveItemCard"
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert"
import { AlertCircle, Megaphone, Terminal } from "lucide-react"

export function AlertPanel() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-semibold">
        You have books with no enchantments!
      </AlertTitle>
      <AlertDescription>
        Please <i>remove any books without enchantments</i> to calculate the
        optimal enchantment order.
      </AlertDescription>
    </Alert>
  )
}

interface ActiveItemsListProps {
  items: ActiveItem[]
  updateItem: (id: string, updatedItem: Partial<ActiveItem>) => void
  deleteItem: (id: string) => void
}

export default function ActiveItemsList({
  items,
  updateItem,
  deleteItem,
}: ActiveItemsListProps) {
  function hasEmptyBooks() {
    return items.some((i) => i.name === "book" && i.enchantments.length === 0)
  }
  return (
    <>
      {hasEmptyBooks() && <AlertPanel />}
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
            <span className="italic text-slate-600">
              {"You haven't picked any items yet!"}
            </span>

            <span className="text-slate-500">
              Start by clicking an item from the list above.
            </span>
          </div>
        )}
      </div>
    </>
  )
}
