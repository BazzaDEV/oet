import { useAnvilContext } from "hooks/useAnvil";
import { getAnvilCombinations, getBestAnvilCombination } from "lib/calc";
import { getIcon, getItemName } from "lib/items";
import { ActiveItem, AnvilStep } from "lib/types";
import { cn, prettyEnchant } from "lib/utils";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { ArrowRight, Plus } from "lucide-react";

interface AnvilStepsProps {
  items: ActiveItem[];
}

export default function AnvilSteps({ items }: AnvilStepsProps) {
  const { enchantments, edition } = useAnvilContext();

  const combination = getBestAnvilCombination(items, { enchantments, edition });
  console.log("Best combination:", combination);

  return (
    <div className="flex flex-col gap-4">
      {items.length > 1 && combination && combination.steps.length > 0 ? (
        combination.steps.map((step, index) => (
          <AnvilStep key={index} step={step} stepNumber={index + 1} />
        ))
      ) : items.length <= 1 ? (
        <div className="flex flex-col gap-2 text-center">
          <span className="italic text-slate-600">
            The optimal enchantment order for your chosen items will appear
            here.
          </span>
          <span className="text-slate-500">
            Start by picking a few items and give them some enchantments.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-center">
          <span className="italic text-red-600">
            The chosen items and/or enchantments are not compatible.
          </span>
        </div>
      )}
    </div>
  );
}

interface AnvilItemProps {
  item: ActiveItem;
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
          <h4>{getItemName(item)}</h4>
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
            <span className="text-center whitespace-nowrap" key={e.name}>
              {prettyEnchant(e)}
            </span>
          ))
        ) : (
          <span className="italic text-stone-500">No enchantments.</span>
        )}
      </CardContent>
    </Card>
  );
}

interface AnvilStepProps {
  step: AnvilStep;
  stepNumber: number;
}

function AnvilStep({ step, stepNumber }: AnvilStepProps) {
  const { targetItem, sacrificeItem, resultingItem, cost } = step;
  return (
    <div className="m-auto border p-4 rounded-lg">
      <h3>
        Step {stepNumber} <i className="text-slate-500">({cost} levels)</i>
      </h3>
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
  );
}
