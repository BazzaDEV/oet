import { getAllCombinations, getBestCombination } from "lib/calc";
import { ActiveItem } from "lib/types";

interface AnvilStepsProps {
  items: ActiveItem[];
}

export default function AnvilSteps({ items }: AnvilStepsProps) {
  console.log(getBestCombination(items));

  return <div>{}</div>;
}
