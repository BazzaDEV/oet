import {
  ActiveEnchantment,
  ActiveItem,
  Enchantment,
  MinecraftEdition,
  MinecraftEnchantment,
  MinecraftItem,
} from "./types";

function anvil(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  edition: MinecraftEdition,
) {
  const anvilUses = Math.max(targetItem.anvilUses, sacrificeItem.anvilUses) + 1;

  const { enchantingCost, resultingEnchants } = combineEnchantments(
    targetItem,
    sacrificeItem,
    edition,
  );

  const resultingItem = { ...targetItem };
  resultingItem.anvilUses = anvilUses;
  resultingItem.enchantments = resultingEnchants;

  const targetPriorWorkPenalty = targetItem.anvilUses ** 2 - 1;
  const sacrificePriorWorkPenalty = sacrificeItem.anvilUses ** 2 - 1;
  const totalCost =
    targetPriorWorkPenalty + sacrificePriorWorkPenalty + enchantingCost;

  return { totalCost, resultingItem };
}

function combineEnchantments(
  targetItem: ActiveItem,
  sacrificeItem: ActiveItem,
  edition: MinecraftEdition,
) {
  const targetEnchants = targetItem.enchantments;
  const sacrificeEnchants = sacrificeItem.enchantments;

  let enchantingCost = 0;

  const resultingEnchants: ActiveEnchantment[] = [];

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
      return;
    }

    if (sEnchant.level > tEnchant.level) {
      // Sacrifice level is greater
      // Raise target to sacrifice's level
      resEnchant.level = sEnchant.level;
    } else if (
      sEnchant.level === tEnchant.level &&
      tEnchant.level < tEnchant.maxLevel
    ) {
      // Sacrifice level is equal
      // Raise target by one level unless already at max level
      resEnchant.level = tEnchant.level + 1;
    } else {
      // Sacrifice level is less
      // Nothing changes on target
      resEnchant.level = tEnchant.level + 1;
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

    if (edition === MinecraftEdition.Java) {
      enchantingCost += resEnchant.level * multiplier;
    } else {
      enchantingCost += (resEnchant.level - tEnchant.level) * multiplier;
    }
  });

  return { resultingEnchants, enchantingCost };
}

function getAllIncompatibleEnchantments(enchantments: Enchantment[]) {
  const accumulator = new Set<MinecraftEnchantment>();

  enchantments.forEach(
    (e) =>
      e.incompatibleEnchantments?.forEach((enchantment) =>
        accumulator.add(enchantment),
      ),
  );

  return accumulator;
}
