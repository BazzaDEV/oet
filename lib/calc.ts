import {
  ActiveEnchantment,
  ActiveItem,
  AnvilCombination,
  AnvilStep,
  Data,
  MinecraftEdition,
} from "./types";

import { cloneDeep, drop, reduce } from "lodash";
import {
  getAllIncompatibleEnchantments,
  getMultiplier,
  isEqual,
  isEqualOrBetter,
} from "lib/enchantments";
import { permute, prettyEnchant, prettyEnchants, prettyItem } from "./utils";

function getPermutations(items: ActiveItem[]): ActiveItem[][] {
  const permutations = permute<ActiveItem>(items);
  return keepValidPermutations(permutations);
}

export function keepValidPermutations(
  permutations: ActiveItem[][]
): ActiveItem[][] {
  return permutations.filter((permutation) => {
    const items = permutation.map((item) => item.name);

    const [_, error] = reduce(
      drop(items),
      ([target, error], sacrifice) => {
        if (error || target === sacrifice || sacrifice === "book") {
          return [target, error];
        }

        return ["", true];
      },
      [items[0], false]
    );

    return !error;
  });
}

export function getAnvilCombinations(items: ActiveItem[], data: Data) {
  const permutations = getPermutations(items);

  // console.log("Permutations:");
  // permutations.forEach((p) => {
  //   p.forEach((i) => console.log(prettyItem(i)));
  //   console.log("\n\n");
  // });

  const combinations: AnvilCombination[] = [];
  for (const p of permutations) {
    let cost = 0;
    const steps: AnvilStep[] = [];

    while (p.length > 1) {
      const step = anvil(p[0], p[1], data);

      // console.log(step);

      cost += step.cost;
      steps.push(step);

      p.shift();
      p[0] = cloneDeep(step.resultingItem);
    }

    combinations.push({
      finalItem: p[0],
      finalCost: cost,
      steps,
    });
  }

  // console.log(combinations.map((c) => c.finalItem));

  return combinations;
}

export function getBestAnvilCombination(items: ActiveItem[], data: Data) {
  const combinations = getAnvilCombinations(items, data);
  return combinations.reduce((best, curr) => {
    const bestEnchants = best.finalItem.enchantments;
    const currEnchants = curr.finalItem.enchantments;

    if (
      isEqualOrBetter(bestEnchants, currEnchants) ||
      (isEqual(bestEnchants, currEnchants) && best.finalCost < curr.finalCost)
    ) {
      return best;
    } else {
      return curr;
    }
  }, combinations[0]);
}

export function anvil(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  data: Data
) {
  const anvilUses = Math.max(targetItem.anvilUses, sacrificeItem.anvilUses) + 1;

  const { enchantingCost, resultingEnchants } = combineEnchantments(
    targetItem,
    sacrificeItem,
    data
  );

  const resultingItem = cloneDeep(targetItem);
  resultingItem.anvilUses = anvilUses;
  resultingItem.enchantments = resultingEnchants;

  const targetPriorWorkPenalty = 2 ** targetItem.anvilUses - 1;
  const sacrificePriorWorkPenalty = 2 ** sacrificeItem.anvilUses - 1;
  const cost =
    targetPriorWorkPenalty + sacrificePriorWorkPenalty + enchantingCost;

  const step: AnvilStep = {
    targetItem: cloneDeep(targetItem),
    sacrificeItem: cloneDeep(sacrificeItem),
    resultingItem: cloneDeep(resultingItem),
    cost,
  };

  return step;
}

export function combineEnchantments(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  data: Data
) {
  const targetEnchants = targetItem.enchantments;
  const sacrificeEnchants = sacrificeItem.enchantments;

  // console.log("Target ITEM:", targetItem);
  // console.log("Sacrifice ITEM:", sacrificeItem);

  // console.log("Combining these enchantments:");
  // console.log("Target:", prettyEnchants(targetEnchants));
  // console.log("Sacrifice:", prettyEnchants(sacrificeEnchants));

  let enchantingCost = 0;

  let resultingEnchants: ActiveEnchantment[] = cloneDeep(targetEnchants);
  for (const sacrificeEnchant of sacrificeEnchants) {
    const matchingEnchant = cloneDeep(
      resultingEnchants.find((e) => e.name === sacrificeEnchant.name)
    );

    if (!matchingEnchant) {
      // Sacrifice enchantment does not have matching enchantment on the target item.
      // This enchantment is unique from the sacrifice item.
      // Add to the combined enchantments if target does not already have a conflicting enchantment.

      // console.log("Target does not have", prettyEnchant(sacrificeEnchant));

      const incompatibleEnchantOnTarget = getAllIncompatibleEnchantments(
        resultingEnchants,
        data.enchantments
      ).find((e) => e.name === sacrificeEnchant.name);

      if (incompatibleEnchantOnTarget) {
        enchantingCost += 1;
      } else {
        const multiplier = getMultiplier(
          sacrificeItem,
          sacrificeEnchant,
          data.enchantments
        );

        enchantingCost += sacrificeEnchant.level * multiplier;
        resultingEnchants.push(cloneDeep(sacrificeEnchant));
        // console.log(prettyEnchant(sacrificeEnchant), "is compatible. Adding to final item.");
      }
    } else {
      // Sacrifice has a matching enchantment on the target item.
      // Figure out what the level of the shared enchantment on the combined item should be.

      // console.log(
      //   "Target has matching enchant",
      //   prettyEnchant(matchingEnchant),
      //   "with level",
      //   matchingEnchant.level
      // );

      const multiplier = getMultiplier(
        sacrificeItem,
        sacrificeEnchant,
        data.enchantments
      );

      const targetOriginalEnchantLevel = matchingEnchant.level;

      if (matchingEnchant.level < sacrificeEnchant.level) {
        // Sacrifice level is greater
        // Raise combined enchantment to sacrifice's level
        matchingEnchant.level = sacrificeEnchant.level;
        // console.log("Sacrifice level is greater - raised to", matchingEnchant.level);
      } else if (matchingEnchant.level === sacrificeEnchant.level) {
        // Target and sacrifice enchantments have the same level
        // Bump the combined enchantment level by incrementing by 1.
        matchingEnchant.level =
          matchingEnchant.level < matchingEnchant.max_level
            ? (matchingEnchant.level += 1)
            : matchingEnchant.max_level;
        // console.log("Sacrifice level is equal - increment to", matchingEnchant.level);
      } else {
        // Sacrifice enchantment level is less than that of the matching enchantment on the target.
        // Keep target enchantment the same.
        // console.log("Sacrifice level is less - keep combined enchantment at target level", matchingEnchant.level);
      }

      if (data.edition === MinecraftEdition.Java) {
        enchantingCost += matchingEnchant.level * multiplier;
      } else {
        enchantingCost +=
          (matchingEnchant.level - targetOriginalEnchantLevel) * multiplier;
      }

      // console.log(
      //   "Added matching enchantment",
      //   prettyEnchant(matchingEnchant),
      //   "to final item."
      // );

      resultingEnchants = resultingEnchants.map((e) =>
        e.name === matchingEnchant.name
          ? { ...e, level: matchingEnchant.level }
          : e
      );

      // console.log(
      //   "Current final item enchantments:",
      //   prettyEnchants(resultingEnchants)
      // );
    }
  }

  // console.log(
  //   "FINAL RESULT of COMBINING ENCHANTS:",
  //   prettyEnchants(resultingEnchants),
  //   "with cost",
  //   enchantingCost
  // );

  // console.log("Total cost:", enchantingCost, "\n");

  return { resultingEnchants, enchantingCost };
}
