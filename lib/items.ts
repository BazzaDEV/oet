import itemsJson from "lib/data/items.json";
import { values } from "lodash";
import { Item, ItemDetails } from "./types";

export function getItems(): ItemDetails[] {
  return values(itemsJson);
}

export function getItem(item: Item) {
  const result = getItems().find((i) => i.name === item.name);

  if (!result) {
    throw new Error(`Item with name ${item.name} not found`);
  }

  return result;
}

export function getItemName(item: Item) {
  return getItem(item).display_name;
}

export function getIcon(item: Item) {
  return getItem(item).icon;
}
