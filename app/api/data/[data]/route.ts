import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { data: string }
  }
) {
  const dataSlug = params.data.toLowerCase()

  if (dataSlug !== "enchantments" && dataSlug !== "items") {
    return NextResponse.json(
      {
        success: false,
        message: `${dataSlug} is not a valid data type (must be enchantments or items)`,
      },
      { status: 400 }
    )
  }

  const { searchParams } = req.nextUrl
  const mcEdition = searchParams.get("edition")
  const mcVersion = searchParams.get("version")

  if (!mcEdition || !mcVersion) {
    return NextResponse.json(
      {
        success: false,
        message: `Missing Minecraft edition and/or version`,
      },
      { status: 400 }
    )
  }
}
