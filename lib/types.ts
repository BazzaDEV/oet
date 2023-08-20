export enum MinecraftEdition {
  Java = "java",
  Bedrock = "bedrock",
}

export type Data = {
  // items: ItemData[];
  enchantments: EnchantmentDetails[]
  edition: MinecraftEdition
}

// From the database (eg. JSON file)
export type ItemData = {
  name: string
  display_name: string
  icon: string
}

// From the database (eg. JSON file)
export type EnchantmentData = {
  name: string
  display_name: string
  max_level: number
  editions: MinecraftEdition[]
  item_multiplier: number
  book_multiplier: number
  incompatible_with?: string[]
  applies_to: string[]
  overrides?: {
    bedrock?: Omit<EnchantmentData, "overrides">
    java?: Omit<EnchantmentData, "overrides">
  }
}

// Only store name by default
export type Enchantment = Pick<EnchantmentData, "name">

// Only store name by default
export type Item = Pick<ItemData, "name">

// Details for the item - will be the same as ItemData
export type ItemDetails = ItemData
// Details for the enchantment - this type will have enchantment details with
// the edition-specific overrides already applied (hence dropping the field)
export type EnchantmentDetails = Omit<EnchantmentData, "overrides" | "editions">

// ActiveItem is an item that the user is combining in an anvil.
// It has a unique id, the enchantments applied to it, and the # of anvil uses.
export type ActiveItem = Item & {
  id: string
  enchantments: ActiveEnchantment[]
  anvilUses: number
}

// ActiveEnchantment is an enchantment that is being applied to an ActiveItem.
// It has all the properties of a generic enchantment (name), as well as
// the current level of the enchantment.
export type ActiveEnchantment = Pick<
  EnchantmentDetails,
  "name" | "display_name" | "max_level"
> & {
  level: number
}

export type AnvilStep = {
  targetItem: ActiveItem
  sacrificeItem: ActiveItem
  resultingItem: ActiveItem
  cost: number
  error?: boolean
}

export type AnvilCombination = {
  finalItem: ActiveItem
  finalCost: number
  steps: AnvilStep[]
  error?: {
    atStep: number
  }
}
