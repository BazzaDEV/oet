export enum MinecraftEdition {
  Java = "java",
  Bedrock = "bedrock",
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
