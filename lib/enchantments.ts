import { flatMap, flow, map, uniq, values } from "lodash/fp";
import {
  ActiveEnchantment,
  ActiveItem,
  Enchantment,
  EnchantmentData,
  EnchantmentDetails,
  Item,
  MinecraftEdition,
} from "lib/types";
import enchantments from "lib/data/enchantments.json";
import { filter, omit } from "lodash";
import { match } from "assert";

export function getEnchantments(edition: MinecraftEdition) {
  function applyOverrides(e: EnchantmentData): EnchantmentDetails {
    if (!e.overrides) return e;

    const { java, bedrock } = e.overrides;
    const overrides = edition === MinecraftEdition.Java ? java : bedrock;

    return { ...omit(e, "overrides"), ...overrides };
  }

  function filterByEdition(
    enchantments: EnchantmentData[]
  ): EnchantmentDetails[] {
    return filter(enchantments, (e: EnchantmentData) =>
      e.editions.includes(edition)
    );
  }

  return flow([values, filterByEdition, map(applyOverrides)])(
    enchantments
  ) as EnchantmentDetails[];
}

export function getMultiplier(
  item: Item,
  enchantment: Enchantment,
  enchantments: EnchantmentDetails[]
) {
  const enchantmentDetails = getEnchantment(enchantment, enchantments);

  return item.name === "book"
    ? // Use book multiplier
      enchantmentDetails.book_multiplier
    : // Use item multiplier
      enchantmentDetails.item_multiplier;
}

export function getEnchantment(
  enchantment: Enchantment,
  enchantments: EnchantmentDetails[]
) {
  const result = enchantments.find((e) => e.name === enchantment.name);

  if (!result) throw new Error(`Enchantment ${enchantment} not found`);
  return result;
}

export function getPrettyName(
  enchantment: Enchantment,
  enchantments: EnchantmentDetails[]
) {
  return getEnchantment(enchantment, enchantments).display_name;
}

export function getMaxLevel(
  enchantment: Enchantment,
  enchantments: EnchantmentDetails[]
) {
  return getEnchantment(enchantment, enchantments).max_level;
}

export function getApplicableEnchantments(
  item: Item,
  enchantments: EnchantmentDetails[]
) {
  function isApplicableToItem(enchantment: EnchantmentDetails) {
    return enchantment.applies_to.includes(item.name);
  }

  return filter(enchantments, isApplicableToItem);
}

export function itemHasEnchant(item: ActiveItem, enchantment: Enchantment) {
  const result = item.enchantments.find((e) => e.name === enchantment.name);
  return result !== undefined;
}

export function getIncompatibleEnchantments(
  enchantment: Enchantment,
  enchantments: EnchantmentDetails[]
) {
  const incompatibleEnchants =
    getEnchantment(enchantment, enchantments).incompatible_with ?? [];
  return incompatibleEnchants.map((name) => ({
    name,
  }));
}

export function getAllIncompatibleEnchantments(
  input: Enchantment[],
  enchantments: EnchantmentDetails[]
) {
  function incompatible(e: Enchantment) {
    return getIncompatibleEnchantments(e, enchantments);
  }

  return flow([flatMap(incompatible), uniq])(input) as Enchantment[];
}

export function getConflictingEnchantsforItem(
  item: ActiveItem,
  enchantments: EnchantmentDetails[]
) {
  function incompatibleEnchants(e: Enchantment) {
    return getIncompatibleEnchantments(e, enchantments);
  }

  return flow([flatMap(incompatibleEnchants), uniq])(
    item.enchantments
  ) as Enchantment[];
}

export function isEqualOrBetter(
  E1: ActiveEnchantment[],
  E2: ActiveEnchantment[]
) {
  return (
    E1.length >= E2.length &&
    E1.every((e1) => {
      const matchingEnchant = E2.find((e2) => e2.name === e1.name);
      return matchingEnchant && e1.level >= matchingEnchant.level;
    })
  );
}

export function isEqual(E1: ActiveEnchantment[], E2: ActiveEnchantment[]) {
  return (
    E1.length === E2.length &&
    E1.every((e1) => {
      const matchingEnchant = E2.find((e2) => e2.name === e1.name);
      return matchingEnchant && e1.level === matchingEnchant.level;
    })
  );
}
