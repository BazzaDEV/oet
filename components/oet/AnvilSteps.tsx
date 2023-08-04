import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { getAllCombinations, getBestCombination } from "lib/calc";
import { ActiveItem, AnvilStep } from "lib/types";

interface AnvilStepsProps {
  items: ActiveItem[];
}

export default function AnvilSteps({ items }: AnvilStepsProps) {
  const combination = getBestCombination(items);

  return (
    <div>
      {combination?.steps.map((step, index) => (
        <AnvilStep key={index} step={step} index={index + 1} />
      ))}
    </div>
  );
}

interface AnvilStepProps {
  step: AnvilStep;
  index: number;
}

function AnvilStep({ step, index }: AnvilStepProps) {
  const { targetItem, sacrificeItem, resultingItem, cost } = step;
  return <div></div>;
}
