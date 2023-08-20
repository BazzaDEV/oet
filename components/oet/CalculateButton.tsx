import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Props {
  onClick?: () => void
}

export default function CalculateButton({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "w-[230px] rounded-3xl py-8 shadow-xl",
        "flex items-center justify-between",
        "text-2xl",
        "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-300% animate-gradient"
      )}
    >
      <span>Calculate</span>{" "}
      <span className="text-lg animate-slide">{">"}</span>
    </Button>
  )
}
