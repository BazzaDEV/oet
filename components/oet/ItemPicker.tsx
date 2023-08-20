import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip"
import { getItems } from "lib/items"

import { Item } from "lib/types"
import { cn } from "lib/utils"
import Image from "next/image"
import { HTMLAttributes, forwardRef } from "react"

interface ItemPickerCardProps extends HTMLAttributes<HTMLDivElement> {
  item: Item
  imageUrl: string
  onItemClick: (item: Item) => void
  disabled?: boolean
}

const ItemPickerCard = forwardRef<HTMLDivElement, ItemPickerCardProps>(
  ({ className, item, imageUrl, onItemClick, disabled, ...props }, ref) => {
    const cardStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 shadow-sm"
    const outlineStyles =
      "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50"
    const disabledStyles = "pointer-events-none opacity-50"

    return (
      <div
        ref={ref}
        className={cn(
          cardStyles,
          outlineStyles,
          disabled && disabledStyles,
          "p-1 hover:scale-110 duration-2000 transition-all"
        )}
        onClick={(e) => onItemClick(item)}
        {...props}
      >
        <Image
          alt={item.name}
          src={imageUrl}
          width={30}
          height={30}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </div>
    )
  }
)

ItemPickerCard.displayName = "ItemPickerCard"

interface ItemPickerProps {
  // items: ActiveItem[];
  uniqueItem?: Item
  onItemClick: (item: Item) => void
}

export default function ItemPicker({
  // items,
  uniqueItem,
  onItemClick,
}: ItemPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {getItems().map((item) => (
        <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger>
              <ItemPickerCard
                item={{ name: item.name }}
                imageUrl={`/images/items/${item.icon}`}
                onItemClick={onItemClick}
                disabled={
                  item.name !== "book" &&
                  uniqueItem &&
                  uniqueItem.name !== item.name
                }
              />
            </TooltipTrigger>
            <TooltipContent className="select-none">
              <span>{item.display_name}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
