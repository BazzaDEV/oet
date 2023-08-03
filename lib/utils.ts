import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ActiveItem, MinecraftEnchantment, MinecraftItem } from "./types";
import { itemIcons, enchantments } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getItemImageUrl(item: MinecraftItem) {
  const { name, gif } = itemIcons.get(item) as { name: string; gif?: boolean };
  const ext = gif ? "gif" : "png";

  return `/images/items/${name}.${ext}`;
}

export function getApplicableEnchantments(item: MinecraftItem) {
  const enchants = Array.from(enchantments.values());
  const legalEnchants = enchants.filter(({ appliesTo }) =>
    appliesTo.find((validItem) => validItem === item)
  );

  const set = new Set(legalEnchants);
  const arr = Array.from(set);

  return arr;
}

export function itemHasEnchant(
  enchantment: MinecraftEnchantment,
  item: ActiveItem
) {
  const itemEnchants = new Set(item.enchantments.map((e) => e.name));
  return itemEnchants.has(enchantment);
}

export function itemHasConflictingEnchant(
  enchantment: MinecraftEnchantment,
  item: ActiveItem
) {
  const conflictingEnchant = item.enchantments.find((activeEnchant) =>
    activeEnchant.incompatibleEnchantments?.find(
      (incompatibleEnchant) => incompatibleEnchant === enchantment
    )
  );

  return conflictingEnchant !== undefined;
}
