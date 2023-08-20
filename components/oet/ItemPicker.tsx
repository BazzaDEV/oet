import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getItems } from "@/lib/items"

import { Item } from "@/lib/types"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ItemPickerCardProps {
  item: Item
  imageUrl: string
  onClick: (item: Item) => void
  disabled?: boolean
}

function ItemPickerCard({
  item,
  imageUrl,
  onClick,
  disabled,
}: ItemPickerCardProps) {
  const cardStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 shadow-sm"
  const outlineStyles =
    "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50"
  const disabledStyles = "pointer-events-none opacity-50"

  return (
    <div
      className={cn(
        cardStyles,
        outlineStyles,
        disabled && disabledStyles,
        "p-1 hover:scale-110 duration-2000 transition-all"
      )}
      onClick={() => onClick(item)}
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
        <TooltipProvider key={item.name} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <ItemPickerCard
                item={{ name: item.name }}
                imageUrl={`/images/items/${item.icon}`}
                onClick={onItemClick}
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
