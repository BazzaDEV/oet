import { anvil } from "@/lib/calc"
import { getEnchantments } from "@/lib/enchantments"
import { MinecraftEdition } from "@/lib/types"

const targetItem = {
  id: "Gbd0mDTV7bvqJ2WkmJylu",
  name: "pickaxe",
  enchantments: [
    {
      name: "efficiency",
      display_name: "Efficiency",
      max_level: 5,
      editions: ["java", "bedrock"],
      categories: ["tools"],
      item_multiplier: 1,
      book_multiplier: 1,
      applies_to: ["book", "pickaxe", "shovel", "axe", "hoe", "shears"],
      level: 4,
    },
    {
      name: "silk_touch",
      display_name: "Silk Touch",
      max_level: 1,
      editions: ["java", "bedrock"],
      categories: ["tools"],
      item_multiplier: 8,
      book_multiplier: 4,
      incompatible_with: ["fortune"],
      applies_to: ["book", "pickaxe", "shovel", "axe", "hoe"],
      level: 1,
    },
  ],
  anvilUses: 1,
}

const sacrificeItem = {
  id: "-nyxUFNAwLMENtRRPTy2K",
  name: "book",
  enchantments: [
    {
      name: "efficiency",
      display_name: "Efficiency",
      max_level: 5,
      editions: ["java", "bedrock"],
      categories: ["tools"],
      item_multiplier: 1,
      book_multiplier: 1,
      applies_to: ["book", "pickaxe", "shovel", "axe", "hoe", "shears"],
      level: 4,
    },
  ],
  anvilUses: 0,
}

const enchantments = getEnchantments(MinecraftEdition.Java)

describe("Test combine enchantments", () => {
  it("test", () => {
    const { resultingItem, cost } = anvil(targetItem, sacrificeItem, {
      enchantments,
      edition: MinecraftEdition.Java,
    })

    expect(resultingItem.anvilUses).toBe(2)

    expect(resultingItem.enchantments).toStrictEqual([
      {
        name: "efficiency",
        display_name: "Efficiency",
        max_level: 5,
        editions: ["java", "bedrock"],
        categories: ["tools"],
        item_multiplier: 1,
        book_multiplier: 1,
        applies_to: ["book", "pickaxe", "shovel", "axe", "hoe", "shears"],
        level: 5,
      },
      {
        name: "silk_touch",
        display_name: "Silk Touch",
        max_level: 1,
        editions: ["java", "bedrock"],
        categories: ["tools"],
        item_multiplier: 8,
        book_multiplier: 4,
        incompatible_with: ["fortune"],
        applies_to: ["book", "pickaxe", "shovel", "axe", "hoe"],
        level: 1,
      },
    ])

    expect(cost).toBe(6)
  })
})
