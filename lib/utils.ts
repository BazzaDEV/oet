import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ActiveEnchantment, ActiveItem } from "./types"
import { cloneDeep, concat, slice } from "lodash"
import { getItemName } from "./items"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toRoman(num: number) {
  switch (num) {
    case 1:
      return "I"
    case 2:
      return "II"
    case 3:
      return "III"
    case 4:
      return "IV"
    case 5:
      return "V"
  }
}

export function prettyEnchant(enchantment: ActiveEnchantment) {
  return `${enchantment.display_name} ${toRoman(enchantment.level)}`
}

export function prettyEnchants(enchantments: ActiveEnchantment[]) {
  return enchantments.map(prettyEnchant).join(", ")
}

export function prettyItem(item: ActiveItem) {
  return `${getItemName(item)}${
    item.enchantments.length > 0
      ? ` w/ ${prettyEnchants(item.enchantments)}`
      : ""
  }`
}

export function permute<T>(arr: T[]) {
  if (arr.length === 0) {
    return []
  }

  function rec(bag: T[], curr: T[], res: T[][]) {
    if (bag.length === 1) {
      curr.push(bag[0])
      res.push(curr)
      return
    }

    for (let i = 0; i < bag.length; i++) {
      const newCurr = cloneDeep(curr)
      newCurr.push(bag[i])
      if (i === 0) {
        rec(slice(bag, 1), newCurr, res)
      } else if (i === arr.length - 1) {
        rec(slice(bag, 0, i), newCurr, res)
      } else {
        rec(
          concat(slice(bag, 0, i), slice(bag, i + 1, bag.length)),
          newCurr,
          res
        )
      }
    }
  }

  const results: T[][] = []
  rec(arr, [], results)

  return results
}
