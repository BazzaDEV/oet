import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import {
  ActiveEnchantment,
  ActiveItem,
  Enchantment,
  MinecraftEnchantment,
} from "lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { numberToRomanNumeral as toRoman } from "romanumber";
import {
  getApplicableEnchantments,
  getItemImageUrl,
  itemHasConflictingEnchant,
  itemHasEnchant,
} from "lib/utils";
import { ChangeEvent, HTMLAttributes, forwardRef } from "react";
import { Button } from "components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { enchantments } from "lib/data";

interface EnchantmentInputProps {
  enchantment: ActiveEnchantment;
  updateEnchantment: (enchantment: MinecraftEnchantment, level: number) => void;
  deleteEnchantment: (enchantment: MinecraftEnchantment) => void;
}

function EnchantmentInput({
  enchantment,
  updateEnchantment,
  deleteEnchantment,
}: EnchantmentInputProps) {
  const { name, maxLevel, level } = enchantment;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    const level = isNaN(value) ? 1 : value;
    updateEnchantment(enchantment.name, level);
  }

  return (
    <>
      <Label className="text-right">{name}</Label>
      <div className="flex gap-1">
        <Input
          type="number"
          min={1}
          max={maxLevel}
          value={level}
          onChange={handleChange}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteEnchantment(name)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}

interface ItemCardProps {
  item: ActiveItem;
  deleteItem: (id: string) => void;
}

const ItemCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & ItemCardProps
>(({ className, item, deleteItem, ...props }, ref) => (
  <Card
    {...props}
    ref={ref}
    className="hover:scale-105 cursor-pointer select-none hover:shadow-md transition-all duration-[2s]"
  >
    <CardHeader>
      <CardTitle className="flex gap-10 justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            alt=""
            src={getItemImageUrl(item.name)}
            className="icon"
            width={40}
            height={40}
          />
          <span>{item.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-200 hover:bg-red-500"
          onClick={() => deleteItem(item.id)}
        >
          X
        </Button>
      </CardTitle>
      <CardDescription>Penalty: {item.anvilUses}</CardDescription>
    </CardHeader>
    <CardContent
      className="flex flex-col gap-1 text-sm"
      hidden={item.enchantments.length === 0}
    >
      {item.enchantments.length > 0 ? (
        item.enchantments.map((enchantment) => (
          <span key={enchantment.name}>
            {enchantment.name} {toRoman(enchantment.level)}
          </span>
        ))
      ) : (
        <span className="italic text-stone-500">No enchantments.</span>
      )}
    </CardContent>
  </Card>
));

ItemCard.displayName = "ItemCard";

interface ActiveItemCardProps {
  item: ActiveItem;
  updateItem: (id: string, updatedItem: Partial<ActiveItem>) => void;
  deleteItem: (id: string) => void;
}

export default function ActiveItemCard({
  item,
  updateItem,
  deleteItem,
}: ActiveItemCardProps) {
  function updateEnchantment(enchantment: MinecraftEnchantment, level: number) {
    updateItem(item.id, {
      enchantments: [
        ...item.enchantments.map((e) => {
          if (e.name !== enchantment) return e;

          return {
            ...e,
            level,
          };
        }),
      ],
    });
  }

  function deleteEnchantment(enchantment: MinecraftEnchantment) {
    updateItem(item.id, {
      enchantments: [
        ...item.enchantments.filter((e) => e.name !== enchantment),
      ],
    });
  }

  function handlePenaltyChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    const anvilUses = isNaN(value) ? 0 : value;
    updateItem(item.id, { anvilUses });
  }

  function handleEnchantmentSelectorChange(value: string) {
    const enchantment = enchantments.get(
      value as MinecraftEnchantment
    ) as Enchantment;

    if (!enchantment) return;

    updateItem(item.id, {
      enchantments: [
        ...item.enchantments,
        {
          ...enchantment,
          level: 1,
        },
      ],
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ItemCard item={item} deleteItem={deleteItem} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 p-2">
        <div className="grid grid-cols-2 gap-2 items-center mb-3">
          <Label className="text-right">Penalty</Label>
          <Input
            className="mb-3"
            type="number"
            min={0}
            value={item.anvilUses}
            onChange={handlePenaltyChange}
          />

          {item.enchantments.map((e) => (
            <EnchantmentInput
              key={e.name}
              enchantment={e}
              updateEnchantment={updateEnchantment}
              deleteEnchantment={deleteEnchantment}
            />
          ))}
        </div>
        <div>
          <Select onValueChange={handleEnchantmentSelectorChange}>
            <SelectTrigger>
              <SelectValue>
                <span className="text-slate-400">Choose an enchantment...</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-[var(--radix-select-content-available-height)]"
            >
              <SelectGroup>
                {getApplicableEnchantments(item.name).map(({ name }) => (
                  <SelectItem
                    disabled={
                      itemHasEnchant(name, item) ||
                      itemHasConflictingEnchant(name, item)
                    }
                    key={name}
                    value={name}
                  >
                    {!itemHasConflictingEnchant(name, item) ? (
                      name
                    ) : (
                      <div className="text-red-500 flex items-center">
                        {name} <AlertTriangle className="ml-2" />
                      </div>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
