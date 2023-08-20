import { getIcon, getItemName } from "@/lib/items"
import { ActiveItem, AnvilCombination, AnvilStep } from "@/lib/types"
import { prettyEnchant } from "@/lib/utils"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, Plus } from "lucide-react"

interface AnvilStepsProps {
  combination?: AnvilCombination
}

export default function AnvilSteps({ combination }: AnvilStepsProps) {
  return (
    <div className="flex flex-col gap-4">
      {combination &&
        combination.steps.length > 0 &&
        combination.steps.map((step, index) => (
          <AnvilStep key={index} step={step} stepNumber={index + 1} />
        ))}
    </div>
  )
}

interface AnvilItemProps {
  item: ActiveItem
}

function AnvilItem({ item }: AnvilItemProps) {
  return (
    <Card className="basis-1/4 select-none shadow-none border-none bg-transparent">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-3">
          <Image
            alt=""
            src={`/images/items/${getIcon(item)}`}
            className="icon"
            width={40}
            height={40}
          />
          <span className="text-lg sm:text-xl">{getItemName(item)}</span>
        </CardTitle>
        <CardDescription className="text-center">
          Anvil Uses: {item.anvilUses}
        </CardDescription>
      </CardHeader>
      <CardContent
        className="flex flex-col gap-1 text-sm"
        hidden={item.enchantments.length === 0}
      >
        {item.enchantments.length > 0 ? (
          item.enchantments.map((e) => (
            <span className="text-center" key={e.name}>
              {prettyEnchant(e)}
            </span>
          ))
        ) : (
          <span className="italic text-stone-500">No enchantments.</span>
        )}
      </CardContent>
    </Card>
  )
}

interface AnvilStepProps {
  step: AnvilStep
  stepNumber: number
}

function AnvilStep({ step, stepNumber }: AnvilStepProps) {
  const { targetItem, sacrificeItem, resultingItem, cost } = step
  return (
    <div className="m-auto border p-4 rounded-lg">
      <span className="text-lg sm:text-xl">
        Step {stepNumber} <i className="text-slate-500">({cost} levels)</i>
      </span>
      <div className="flex gap-3 items-center max-w-5xl">
        <AnvilItem item={targetItem} />
        <span className="basis-1/8 self-center">
          <Plus className="w-10 h-10" />
        </span>
        <AnvilItem item={sacrificeItem} />
        <span className="basis-1/8 self-center">
          <ArrowRight className="w-10 h-10" />
        </span>
        <AnvilItem item={resultingItem} />
      </div>
    </div>
  )
}
