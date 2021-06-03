public enum Enchantment {
	AQUA_AFFINITY         (1, 2),
	BANE_OF_ARTHROPODS    (5, 1),
	BLAST_PROTECTION      (4, 2),
	CHANNELING            (1, 4),
	CURSE_OF_BINDING      (1, 4),
	CURSE_OF_VANISHING    (1, 4),
	DEPTH_STRIDER         (3, 2),
	EFFICIENCY            (5, 1),
	FEATHER_FALLING       (4, 1),
	FIRE_ASPECT           (2, 2),
	FIRE_PROTECTION       (4, 1),
	FLAME                 (1, 2),
	FORTUNE               (3, 2),
	FROST_WALKER          (2, 2),
	IMPALING              (5, 1),
	INFINITY              (1, 4),
	KNOCKBACK             (2, 1),
	LOOTING               (3, 2),
	LOYALTY               (3, 1),
	LUCK_OF_THE_SEA       (3, 2),
	LURE                  (3, 2),
	MENDING               (1, 2),
	MULTISHOT             (1, 2),
	PIERCING              (4, 1),
	POWER                 (5, 1),
	PROJECTILE_PROTECTION (4, 1),
	PROTECTION            (4, 1),
	PUNCH                 (2, 2),
	QUICK_CHARGE          (3, 1),
	RESPIRATION           (3, 2),
	RIPTIDE               (3, 2),
	SHARPNESS             (5, 1),
	SILK_TOUCH            (1, 4),
	SMITE                 (5, 1),
	SWEEPING_EDGE         (3, 2),
	THORNS                (3, 4),
	UNBREAKING            (3, 1);

	private final int mMaximumLevel;
	private final int mMultiplierFromBook;

	private Enchantment(int maximumLevel, int multiplierFromBook) {
		this.mMaximumLevel = maximumLevel;
		this.mMultiplierFromBook = multiplierFromBook;
	}

	public int getMaximumLevel() {
		return this.mMaximumLevel;
	}

	public int getMultiplierFromBook() {
		return this.mMultiplierFromBook;
	}
}