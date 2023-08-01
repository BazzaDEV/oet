import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/ui/card";

import localFont from "next/font/local";
import Image from "next/image";
import diamondSwordUrl from "public/images/items/sword.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Font files can be colocated inside of `app`
const minecraft = localFont({
  src: "../public/fonts/Minecraft.otf",
});

// Font files can be colocated inside of `app`
const faithful = localFont({
  src: "../public/fonts/Faithful.ttf",
});

export default function ItemCard() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card
          className={`${minecraft.className} cursor-pointer hover:shadow-md transition-all duration-[2s]`}
        >
          <CardHeader>
            <CardTitle className="tracking-normal flex gap-3 items-center">
              <Image alt="" src={diamondSwordUrl} className="icon" />
              <span>Sword</span>
            </CardTitle>
            <CardDescription>Penalty: 0</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <span>Sharpness IV</span>
            <span>Fire Aspect II</span>
            <span>Unbreaking III</span>
          </CardContent>
        </Card>
      </PopoverTrigger>
      <PopoverContent className={`m-3 flex flex-col gap-1 p-2`}>
        <div className="flex items-center gap-5">
          <Label>Penalty</Label>
          <Input type="number" min={0} defaultValue={0} maxLength={1} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
