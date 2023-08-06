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

  // const combinations = getAnvilCombinations(items, { enchantments, edition });
  // console.log("Combinations:", combinations);

  const combination = getBestAnvilCombination(items, { enchantments, edition });
  console.log("Best combination:", combination);

  return (
    <div className="flex flex-col gap-4">
      {combination?.steps.map((step, index) => (
        <AnvilStep key={index} step={step} stepNumber={index + 1} />
      ))}
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
          <h3>{getItemName(item)}</h3>
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
  );
}

interface AnvilStepProps {
  step: AnvilStep;
  stepNumber: number;
}

function AnvilStep({ step, stepNumber }: AnvilStepProps) {
  const { targetItem, sacrificeItem, resultingItem, cost } = step;
  return (
    <div className="m-auto">
      <h3>
        Step {stepNumber} <i className="text-slate-500">({step.cost} levels)</i>
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
