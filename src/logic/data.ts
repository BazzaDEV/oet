import {
  Enchantment,
  MinecraftEdition,
  MinecraftEnchantment,
  MinecraftItem,
} from "./types";

export const enchantments = new Map<MinecraftEnchantment, Enchantment>();

enchantments.set(MinecraftEnchantment.Protection, {
  name: MinecraftEnchantment.Protection,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.FireProtection,
    MinecraftEnchantment.BlastProtection,
    MinecraftEnchantment.ProjectileProtection,
  ],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
  ],
});

enchantments.set(MinecraftEnchantment.FireProtection, {
  name: MinecraftEnchantment.Protection,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.Protection,
    MinecraftEnchantment.BlastProtection,
    MinecraftEnchantment.ProjectileProtection,
  ],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
  ],
});

enchantments.set(MinecraftEnchantment.FeatherFalling, {
  name: MinecraftEnchantment.FeatherFalling,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Boots],
});

enchantments.set(MinecraftEnchantment.BlastProtection, {
  name: MinecraftEnchantment.BlastProtection,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [
    MinecraftEnchantment.Protection,
    MinecraftEnchantment.FireProtection,
    MinecraftEnchantment.ProjectileProtection,
  ],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
  ],
});

enchantments.set(MinecraftEnchantment.ProjectileProtection, {
  name: MinecraftEnchantment.ProjectileProtection,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.Protection,
    MinecraftEnchantment.FireProtection,
    MinecraftEnchantment.BlastProtection,
  ],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
  ],
});

enchantments.set(MinecraftEnchantment.Thorns, {
  name: MinecraftEnchantment.Thorns,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
  ],
});

enchantments.set(MinecraftEnchantment.Respiration, {
  name: MinecraftEnchantment.Respiration,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Helmet],
});

enchantments.set(MinecraftEnchantment.DepthStrider, {
  name: MinecraftEnchantment.DepthStrider,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [MinecraftEnchantment.FrostWalker],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Boots],
});

enchantments.set(MinecraftEnchantment.AquaAffinity, {
  name: MinecraftEnchantment.AquaAffinity,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Helmet],
});

enchantments.set(MinecraftEnchantment.Sharpness, {
  name: MinecraftEnchantment.Sharpness,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.Smite,
    MinecraftEnchantment.BaneOfArthropods,
  ],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword, MinecraftItem.Axe],
});

enchantments.set(MinecraftEnchantment.Smite, {
  name: MinecraftEnchantment.Smite,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.Sharpness,
    MinecraftEnchantment.BaneOfArthropods,
  ],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword, MinecraftItem.Axe],
});

enchantments.set(MinecraftEnchantment.BaneOfArthropods, {
  name: MinecraftEnchantment.BaneOfArthropods,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  incompatibleEnchantments: [
    MinecraftEnchantment.Sharpness,
    MinecraftEnchantment.Smite,
  ],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword, MinecraftItem.Axe],
});

enchantments.set(MinecraftEnchantment.Knockback, {
  name: MinecraftEnchantment.Knockback,
  maxLevel: 2,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword],
});

enchantments.set(MinecraftEnchantment.FireAspect, {
  name: MinecraftEnchantment.FireAspect,
  maxLevel: 2,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword],
});

enchantments.set(MinecraftEnchantment.Looting, {
  name: MinecraftEnchantment.Looting,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword],
});

enchantments.set(MinecraftEnchantment.Efficiency, {
  name: MinecraftEnchantment.Efficiency,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.Hoe,
    MinecraftItem.Shears,
  ],
});

enchantments.set(MinecraftEnchantment.SilkTouch, {
  name: MinecraftEnchantment.SilkTouch,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  incompatibleEnchantments: [MinecraftEnchantment.Fortune],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.Hoe,
  ],
});

enchantments.set(MinecraftEnchantment.Unbreaking, {
  name: MinecraftEnchantment.Unbreaking,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.FishingRod,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
    MinecraftItem.Sword,
    MinecraftItem.Bow,
    MinecraftItem.Hoe,
    MinecraftItem.Shears,
    MinecraftItem.FlintAndSteel,
    MinecraftItem.Shield,
    MinecraftItem.Elytra,
    MinecraftItem.Trident,
    MinecraftItem.Crossbow,
  ],
});

enchantments.set(MinecraftEnchantment.Fortune, {
  name: MinecraftEnchantment.Fortune,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [MinecraftEnchantment.SilkTouch],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.Hoe,
  ],
});

enchantments.set(MinecraftEnchantment.Power, {
  name: MinecraftEnchantment.Power,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Bow],
});

enchantments.set(MinecraftEnchantment.Punch, {
  name: MinecraftEnchantment.Punch,
  maxLevel: 2,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Bow],
});

enchantments.set(MinecraftEnchantment.Flame, {
  name: MinecraftEnchantment.Flame,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Bow],
});

enchantments.set(MinecraftEnchantment.Infinity, {
  name: MinecraftEnchantment.Infinity,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  incompatibleEnchantments: [MinecraftEnchantment.Mending],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Bow],
});

enchantments.set(MinecraftEnchantment.LuckOfTheSea, {
  name: MinecraftEnchantment.LuckOfTheSea,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.FishingRod],
});

enchantments.set(MinecraftEnchantment.Lure, {
  name: MinecraftEnchantment.Lure,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.FishingRod],
});

enchantments.set(MinecraftEnchantment.FrostWalker, {
  name: MinecraftEnchantment.FrostWalker,
  maxLevel: 2,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [MinecraftEnchantment.DepthStrider],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Boots],
});

enchantments.set(MinecraftEnchantment.Mending, {
  name: MinecraftEnchantment.Mending,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [MinecraftEnchantment.Infinity],
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.FishingRod,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
    MinecraftItem.Sword,
    MinecraftItem.Bow,
    MinecraftItem.Hoe,
    MinecraftItem.Shears,
    MinecraftItem.FlintAndSteel,
    MinecraftItem.Shield,
    MinecraftItem.Elytra,
    MinecraftItem.Trident,
    MinecraftItem.Crossbow,
  ],
});

enchantments.set(MinecraftEnchantment.CurseOfBinding, {
  name: MinecraftEnchantment.CurseOfBinding,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
    MinecraftItem.Elytra,
  ],
});

enchantments.set(MinecraftEnchantment.CurseOfVanishing, {
  name: MinecraftEnchantment.CurseOfVanishing,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  appliesTo: [
    MinecraftItem.Book,
    MinecraftItem.Pickaxe,
    MinecraftItem.Shovel,
    MinecraftItem.Axe,
    MinecraftItem.FishingRod,
    MinecraftItem.Helmet,
    MinecraftItem.Chestplate,
    MinecraftItem.Leggings,
    MinecraftItem.Boots,
    MinecraftItem.Sword,
    MinecraftItem.Bow,
    MinecraftItem.Hoe,
    MinecraftItem.Shears,
    MinecraftItem.FlintAndSteel,
    MinecraftItem.Shield,
    MinecraftItem.Elytra,
    MinecraftItem.Trident,
    MinecraftItem.Crossbow,
  ],
});

enchantments.set(MinecraftEnchantment.Impaling, {
  name: MinecraftEnchantment.Impaling,
  maxLevel: 5,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: new Map<MinecraftEdition, number>([
    [MinecraftEdition.Java, 4],
    [MinecraftEdition.Bedrock, 2],
  ]),
  bookMultiplier: new Map<MinecraftEdition, number>([
    [MinecraftEdition.Java, 2],
    [MinecraftEdition.Bedrock, 1],
  ]),
  appliesTo: [MinecraftItem.Book, MinecraftItem.Trident],
});

enchantments.set(MinecraftEnchantment.Riptide, {
  name: MinecraftEnchantment.Riptide,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [
    MinecraftEnchantment.Loyalty,
    MinecraftEnchantment.Channeling,
  ],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Trident],
});

enchantments.set(MinecraftEnchantment.Loyalty, {
  name: MinecraftEnchantment.Loyalty,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  incompatibleEnchantments: [MinecraftEnchantment.Riptide],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Trident],
});

enchantments.set(MinecraftEnchantment.Channeling, {
  name: MinecraftEnchantment.Channeling,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  incompatibleEnchantments: [MinecraftEnchantment.Riptide],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Trident],
});

enchantments.set(MinecraftEnchantment.Multishot, {
  name: MinecraftEnchantment.Multishot,
  maxLevel: 1,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  incompatibleEnchantments: [MinecraftEnchantment.Piercing],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Crossbow],
});

enchantments.set(MinecraftEnchantment.Piercing, {
  name: MinecraftEnchantment.Piercing,
  maxLevel: 4,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 1,
  bookMultiplier: 1,
  incompatibleEnchantments: [MinecraftEnchantment.Multishot],
  appliesTo: [MinecraftItem.Book, MinecraftItem.Crossbow],
});

enchantments.set(MinecraftEnchantment.QuickCharge, {
  name: MinecraftEnchantment.QuickCharge,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 2,
  bookMultiplier: 1,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Crossbow],
});

enchantments.set(MinecraftEnchantment.SoulSpeed, {
  name: MinecraftEnchantment.SoulSpeed,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Boots],
});

enchantments.set(MinecraftEnchantment.SwiftSneak, {
  name: MinecraftEnchantment.SwiftSneak,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java, MinecraftEdition.Bedrock]),
  itemMultiplier: 8,
  bookMultiplier: 4,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Leggings],
});

enchantments.set(MinecraftEnchantment.SweepingEdge, {
  name: MinecraftEnchantment.SweepingEdge,
  maxLevel: 3,
  editions: new Set([MinecraftEdition.Java]),
  itemMultiplier: 4,
  bookMultiplier: 2,
  appliesTo: [MinecraftItem.Book, MinecraftItem.Sword],
});
