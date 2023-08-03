import {
  ActiveEnchantment,
  ActiveItem,
  AnvilCombination,
  AnvilStep,
  Enchantment,
  MinecraftEdition,
  MinecraftEnchantment,
  MinecraftItem,
} from "./types";

import { cloneDeep, minBy } from "lodash";

function getAllPermutations(items: ActiveItem[]) {
  const result: ActiveItem[][] = [];

  function permute(arr: ActiveItem[], m: ActiveItem[] = []) {
    if (arr.length === 0) {
      result.push(cloneDeep(m));
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  }

  permute(items);

  return result;
}

export function getAllCombinations(items: ActiveItem[]) {
  const permutations = getAllPermutations(items);

  const combinations: AnvilCombination[] = [];

  for (const p of permutations) {
    let cost = 0;
    const steps: AnvilStep[] = [];

    while (p.length > 1) {
      const step = anvil(p[0], p[1], MinecraftEdition.Java);

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

  return combinations;
}

export function getBestCombination(items: ActiveItem[]) {
  const combinations = getAllCombinations(items);
  return minBy(combinations, (c) => c.finalCost);
}

function anvil(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  edition: MinecraftEdition
) {
  const anvilUses = Math.max(targetItem.anvilUses, sacrificeItem.anvilUses) + 1;

  const { enchantingCost, resultingEnchants } = combineEnchantments(
    targetItem,
    sacrificeItem,
    edition
  );

  const resultingItem = { ...targetItem };
  resultingItem.anvilUses = anvilUses;
  resultingItem.enchantments = resultingEnchants;

  const targetPriorWorkPenalty = 2 ** targetItem.anvilUses - 1;
  const sacrificePriorWorkPenalty = 2 ** sacrificeItem.anvilUses - 1;
  const cost =
    targetPriorWorkPenalty + sacrificePriorWorkPenalty + enchantingCost;

  const step: AnvilStep = {
    targetItem,
    sacrificeItem,
    resultingItem,
    cost,
  };

  return step;
}

function combineEnchantments(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  edition: MinecraftEdition
) {
  const targetEnchants = targetItem.enchantments;
  const sacrificeEnchants = sacrificeItem.enchantments;

  let enchantingCost = 0;

  const resultingEnchants: ActiveEnchantment[] = [...targetEnchants];

  sacrificeEnchants.forEach((sEnchant) => {
    const tEnchant = targetEnchants.find((e) => e.name === sEnchant.name);
    const resEnchant: ActiveEnchantment = { ...sEnchant };

    if (!tEnchant) {
      // Target does not have matching enchant
      // Add all levels unless incompatible with existing enchant on target
      const incompatibleEnchants =
        getAllIncompatibleEnchantments(targetEnchants);

      if (incompatibleEnchants.has(sEnchant.name)) {
        enchantingCost++;
        return;
      }

      const bookMultiplier =
        resEnchant.bookMultiplier instanceof Map
          ? (resEnchant.bookMultiplier.get(edition) as number)
          : resEnchant.bookMultiplier;
      const itemMultiplier =
        resEnchant.itemMultiplier instanceof Map
          ? (resEnchant.itemMultiplier.get(edition) as number)
          : resEnchant.itemMultiplier;

      const multiplier =
        sacrificeItem.name === MinecraftItem.Book
          ? bookMultiplier
          : itemMultiplier;

      enchantingCost += resEnchant.level * multiplier;

      resultingEnchants.push(resEnchant);
      return;
    }

    const bookMultiplier =
      resEnchant.bookMultiplier instanceof Map
        ? (resEnchant.bookMultiplier.get(edition) as number)
        : resEnchant.bookMultiplier;
    const itemMultiplier =
      resEnchant.itemMultiplier instanceof Map
        ? (resEnchant.itemMultiplier.get(edition) as number)
        : resEnchant.itemMultiplier;

    const multiplier =
      sacrificeItem.name === MinecraftItem.Book
        ? bookMultiplier
        : itemMultiplier;

    if (sEnchant.level > tEnchant.level) {
      // Sacrifice level is greater
      // Raise target to sacrifice's level
      resEnchant.level = sEnchant.level;

      if (MinecraftEdition.Java) {
        enchantingCost += resEnchant.level * multiplier;
      } else {
        enchantingCost += (resEnchant.level - tEnchant.level) * multiplier;
      }
    } else if (
      sEnchant.level === tEnchant.level &&
      tEnchant.level < tEnchant.maxLevel
    ) {
      // Sacrifice level is equal
      // Raise target by one level unless already at max level
      resEnchant.level = tEnchant.level + 1;

      if (MinecraftEdition.Java) {
        enchantingCost += resEnchant.level * multiplier;
      } else {
        enchantingCost += (resEnchant.level - tEnchant.level) * multiplier;
      }
    } else {
      // Sacrifice level is less
      // Nothing changes on target
      resEnchant.level = tEnchant.level + 1;
    }

    return resultingEnchants.map((rEnchant) =>
      rEnchant.name === resEnchant.name ? { ...resEnchant } : rEnchant
    );
  });

  return { resultingEnchants, enchantingCost };
}

function getAllIncompatibleEnchantments(enchantments: Enchantment[]) {
  const accumulator = new Set<MinecraftEnchantment>();

  enchantments.forEach((e) =>
    e.incompatibleEnchantments?.forEach((enchantment) =>
      accumulator.add(enchantment)
    )
  );

  return accumulator;
}
