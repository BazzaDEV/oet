import { getEnchantments } from "lib/enchantments";
import {
  ActiveItem,
  Enchantment,
  EnchantmentData,
  MinecraftEdition,
} from "lib/types";
import enchantmentsJson from "lib/data/enchantments.json";
import { omit, values } from "lodash";

describe("Enchantments", () => {
  describe("Get enchantments by Minecraft edition", () => {
    describe("Java Edition enchantments", () => {
      const javaEnchantments = getEnchantments(MinecraftEdition.Java);

      describe("Should contain only Java enchantments", () => {
        values<EnchantmentData>(enchantmentsJson).forEach((enchantment) => {
          const existsInJava = enchantment.editions.includes(
            MinecraftEdition.Java
          );
          const searchResult = javaEnchantments.find(
            (je) => je.name === enchantment.name
          );

          if (existsInJava) {
            // Enchantment should exist in Java
            it(`Should contain ${enchantment.display_name}`, () =>
              expect(searchResult).toBeTruthy());
          } else {
            // Enchantment should not exist in Java
            it(`Should not contain ${enchantment.display_name}`, () =>
              expect(searchResult).toBeFalsy());
          }
        });
      });

      describe("Should use Java Edition overrides for", () => {
        values<EnchantmentData>(enchantmentsJson).forEach((enchantment) => {
          const javaEnchantment = javaEnchantments.find(
            (je) => je.name === enchantment.name
          );

          if (enchantment.overrides?.java) {
            // Should have Java overrides
            const overrides = enchantment.overrides.java;
            const expectedEnchantment = omit(
              {
                ...enchantment,
                ...overrides,
              },
              "overrides"
            );
            it(`${enchantment.display_name}`, () =>
              expect(javaEnchantment).toStrictEqual(expectedEnchantment));
          }
        });
      });
    });

    describe("Bedrock Edition enchantments", () => {
      const bedrockEnchantments = getEnchantments(MinecraftEdition.Bedrock);

      describe("Should contain only Bedrock enchantments", () => {
        values<EnchantmentData>(enchantmentsJson).forEach((enchantment) => {
          const existsInBedrock = enchantment.editions.includes(
            MinecraftEdition.Bedrock
          );
          const searchResult = bedrockEnchantments.find(
            (je) => je.name === enchantment.name
          );

          if (existsInBedrock) {
            // Enchantment should exist in Bedrock
            it(`Should contain ${enchantment.display_name}`, () =>
              expect(searchResult).toBeTruthy());
          } else {
            // Enchantment should not exist in Bedrock
            it(`Should not contain ${enchantment.display_name}`, () =>
              expect(searchResult).toBeFalsy());
          }
        });
      });

      describe("Should use Bedrock Edition overrides for", () => {
        values<EnchantmentData>(enchantmentsJson).forEach((enchantment) => {
          const bedrockEnchant = bedrockEnchantments.find(
            (je) => je.name === enchantment.name
          );

          if (enchantment.overrides?.bedrock) {
            // Should have Bedrock overrides
            const overrides = enchantment.overrides.bedrock;
            const expectedEnchantment = omit(
              {
                ...enchantment,
                ...overrides,
              },
              "overrides"
            );
            it(`${enchantment.display_name}`, () =>
              expect(bedrockEnchant).toStrictEqual(expectedEnchantment));
          }
        });
      });
    });
  });

  // describe("Get incompatible enchantments", () => {
  //   const enchantment: Enchantment = {
  //     name: "silk_touch",
  //   };

  //   const java

  // });
});
