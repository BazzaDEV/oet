export enum MinecraftEdition {
  Bedrock,
  Java,
}

export enum MinecraftEnchantment {
  Protection = "Protection",
  FireProtection = "Fire Protection",
  FeatherFalling = "Feather Falling",
  BlastProtection = "Blast Protection",
  ProjectileProtection = "Projectile Protection",
  Thorns = "Thorns",
  Respiration = "Respiration",
  DepthStrider = "Depth Strider",
  AquaAffinity = "Aqua Affinity",
  Sharpness = "Sharpness",
  Smite = "Smite",
  BaneOfArthropods = "Bane of Arthropods",
  Knockback = "Knockback",
  FireAspect = "Fire Aspect",
  Looting = "Looting",
  Efficiency = "Efficiency",
  SilkTouch = "Silk Touch",
  Unbreaking = "Unbreaking",
  Fortune = "Fortune",
  Power = "Power",
  Punch = "Punch",
  Flame = "Flame",
  Infinity = "Infinity",
  LuckOfTheSea = "Luck of the Sea",
  Lure = "Lure",
  FrostWalker = "Frost Walker",
  Mending = "Mending",
  CurseOfBinding = "Curse of Binding",
  CurseOfVanishing = "Curse of Vanishing",
  Impaling = "Impaling",
  Riptide = "Riptide",
  Loyalty = "Loyalty",
  Channeling = "Channeling",
  Multishot = "Multishot",
  Piercing = "Piercing",
  QuickCharge = "Quick Charge",
  SoulSpeed = "Soul Speed",
  SwiftSneak = "Swift Sneak",
  SweepingEdge = "Sweeping Edge",
}

export enum MinecraftItem {
  Book = "Book",
  Helmet = "Helmet",
  Chestplate = "Chestplate",
  Leggings = "Leggings",
  Boots = "Boots",
  Sword = "Sword",
  Axe = "Axe",
  Pickaxe = "Pickaxe",
  Shovel = "Shovel",
  Hoe = "Hoe",
  Shears = "Shears",
  FishingRod = "Fishing Rod",
  FlintAndSteel = "Flint and Steel",
  Elytra = "Elytra",
  Trident = "Trident",
  Crossbow = "Crossbow",
  Bow = "Bow",
  Shield = "Shield",
}

export type Enchantment = {
  name: MinecraftEnchantment;
  maxLevel: number;
  editions: Set<MinecraftEdition>;
  itemMultiplier: number | Map<MinecraftEdition, number>;
  bookMultiplier: number | Map<MinecraftEdition, number>;
  incompatibleEnchantments?: MinecraftEnchantment[];
  appliesTo: MinecraftItem[];
};

export type Item = {
  name: MinecraftItem;
};

export type ActiveItem = Item & {
  id: string;
  enchantments: ActiveEnchantment[];
  anvilUses: number;
};

export type ActiveEnchantment = Enchantment & {
  level: number;
};

export type AnvilStep = {
  targetItem: ActiveItem;
  sacrificeItem: ActiveItem;
  resultingItem: ActiveItem;
  cost: number;
};

export type AnvilCombination = {
  finalItem: ActiveItem;
  finalCost: number;
  steps: AnvilStep[];
};
