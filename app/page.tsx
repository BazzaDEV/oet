import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Input } from "postcss";
import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="tracking-tighter">Optimal Enchant Tool</h1>
      <div className="flex flex-wrap justify-center gap-3">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </main>
  );
}
