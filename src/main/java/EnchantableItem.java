public enum EnchantableItem {

    // Tools
    PICKAXE("Pickaxe"),
    AXE("Axe"),
    HOE("Hoe"),
    SHOVEL("Shovel"),
    FISHING_ROD("Fishing Rod"),
    SHEARS("Shears"),

    // Weapons
    BOW("Bow"),
    SWORD("Sword"),
    CROSSBOW("Crossbow"),
    TRIDENT("Trident"),

    // Armor
    HELMET("Helmet"),
    CHESTPLATE("Chestplate"),
    LEGGINGS("Leggings"),
    BOOTS("Boots"),


    ;

    private final String itemName;

    EnchantableItem(String itemName) {
        this.itemName = itemName;
    }

    public String getItemName() {
        return itemName;
    }
}
