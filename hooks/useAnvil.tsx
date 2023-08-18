// How to use React Context like a pro:
// https://devtrium.com/posts/how-use-react-context-pro

import { getEnchantments } from "lib/enchantments"
import { Enchantment, EnchantmentDetails, MinecraftEdition } from "lib/types"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type AnvilContext = {
  edition: MinecraftEdition
  enchantments: EnchantmentDetails[]
  // getEnchantment: (enchantment: Enchantment) => Enchantment;
  // getMaxLevel: (enchantment: Enchantment) => number;
}

const AnvilContext = createContext<AnvilContext>({} as AnvilContext)

const AnvilContextProvider = ({ children }: { children: ReactNode }) => {
  const [edition, setEdition] = useState<MinecraftEdition>(
    MinecraftEdition.Java
  )
  const [enchantments, setEnchantments] = useState<EnchantmentDetails[]>(
    getEnchantments(MinecraftEdition.Java)
  )

  useEffect(() => {
    // console.log(enchantments);
  }, [enchantments])

  const contextValue = useMemo(
    () => ({
      edition,
      enchantments,
    }),
    [edition, enchantments]
  )

  return (
    <AnvilContext.Provider value={contextValue}>
      {children}
    </AnvilContext.Provider>
  )
}

const useAnvilContext = () => {
  const context = useContext(AnvilContext)

  if (context === undefined) {
    throw new Error("useAnvilContext was used outside of its provider.")
  }

  return context
}

export { AnvilContextProvider, useAnvilContext }
