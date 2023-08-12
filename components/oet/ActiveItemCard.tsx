import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { ActiveEnchantment, ActiveItem, Enchantment } from "lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { numberToRomanNumeral as toRoman } from "romanumber";
import { ChangeEvent, HTMLAttributes, forwardRef, useState } from "react";
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
import {
  getApplicableEnchantments,
  getConflictingEnchantsforItem,
  itemHasEnchant,
} from "lib/enchantments";
import { useAnvilContext } from "hooks/useAnvil";
import { getIcon, getItemName } from "lib/items";

interface EnchantmentInputProps {
  enchantment: ActiveEnchantment;
  updateEnchantment: (enchantment: Enchantment, level: number) => void;
  deleteEnchantment: (enchantment: Enchantment) => void;
}

function EnchantmentInput({
  enchantment,
  updateEnchantment,
  deleteEnchantment,
}: EnchantmentInputProps) {
  const [level, setLevel] = useState<number>(1);
  const { display_name, max_level } = enchantment;

  function handleChange(value: string) {
    const newLevel = Number(value);
    if (newLevel > 0 && newLevel <= max_level) {
      updateEnchantment(enchantment, newLevel);
      setLevel(newLevel);
    }
  }

  return (
    <>
      <Label className="text-right">{display_name}</Label>
      <div className="flex gap-1">
        <Select value={level.toString()} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue>{level}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[...Array(max_level + 1).keys()].slice(1).map((i) => (
              <SelectItem key={i} value={String(i)}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteEnchantment(enchantment)}
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
>(function ({ className, item, deleteItem, ...props }, ref) {
  return (
    <Card
      {...props}
      ref={ref}
      className="cursor-pointer select-none transition-all duration-2000 hover:scale-105 shadow-md"
    >
      <CardHeader>
        <CardTitle className="flex gap-10 justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image
              alt=""
              src={`/images/items/${getIcon(item)}`}
              className="icon"
              width={40}
              height={40}
            />
            <h4>{getItemName(item)}</h4>
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
              {enchantment.display_name} {toRoman(enchantment.level)}
            </span>
          ))
        ) : (
          <span className="italic text-stone-500">No enchantments.</span>
        )}
      </CardContent>
    </Card>
  );
});

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
  const [selector, setSelector] = useState<string | undefined>(undefined);
  const { enchantments } = useAnvilContext();

  function updateEnchantment(enchantment: Enchantment, level: number) {
    updateItem(item.id, {
      enchantments: [
        ...item.enchantments.map((e) => {
          if (e.name !== enchantment.name) return e;

          return {
            ...e,
            level,
          };
        }),
      ],
    });
  }

  function deleteEnchantment(enchantment: Enchantment) {
    updateItem(item.id, {
      enchantments: [
        ...item.enchantments.filter((e) => e.name !== enchantment.name),
      ],
    });
  }

  function handlePenaltyChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    const anvilUses = isNaN(value) ? 0 : value;
    updateItem(item.id, { anvilUses });
  }

  function handleEnchantmentSelectorChange(value: string) {
    setSelector("");

    const enchantment = enchantments.find((e) => e.name === value);

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

  const conflictingEnchants = getConflictingEnchantsforItem(
    item,
    enchantments
  ).map((e) => e.name);

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
          <Select
            value={selector}
            onValueChange={handleEnchantmentSelectorChange}
          >
            <SelectTrigger>
              <SelectValue asChild>
                <span className="text-slate-400">Choose an enchantment...</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-[var(--radix-select-content-available-height)]"
            >
              <SelectGroup>
                {getApplicableEnchantments(item, enchantments).map(
                  (enchantment) => (
                    <SelectItem
                      disabled={
                        itemHasEnchant(item, enchantment) ||
                        conflictingEnchants.includes(enchantment.name)
                      }
                      key={enchantment.name}
                      value={enchantment.name}
                    >
                      {!conflictingEnchants.includes(enchantment.name) ? (
                        enchantment.display_name
                      ) : (
                        <div className="text-red-500 flex items-center">
                          {enchantment.display_name}{" "}
                          <AlertTriangle className="ml-2" />
                        </div>
                      )}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
