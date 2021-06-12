import java.util.Arrays;

public enum Enchantment {
	AQUA_AFFINITY         ("Aqua Affinity", 1, 2),
	BANE_OF_ARTHROPODS    ("Bane of Arthropods", 5, 1),
	BLAST_PROTECTION      ("Blast Protection", 4, 2),
	CHANNELING            ("Channeling", 1, 4),
	CURSE_OF_BINDING      ("Curse of Binding", 1, 4),
	CURSE_OF_VANISHING    ("Curse of Vanishing", 1, 4),
	DEPTH_STRIDER         ("Depth Strider", 3, 2),
	EFFICIENCY            ("Efficiency", 5, 1),
	FEATHER_FALLING       ("Feather Falling", 4, 1),
	FIRE_ASPECT           ("Fire Aspect", 2, 2),
	FIRE_PROTECTION       ("Fire Protection", 4, 1),
	FLAME                 ("Flame", 1, 2),
	FORTUNE               ("Fortune", 3, 2),
	FROST_WALKER          ("Frost Walker", 2, 2),
	IMPALING              ("Impaling", 5, 1),
	INFINITY              ("Infinity", 1, 4),
	KNOCKBACK             ("Knockback", 2, 1),
	LOOTING               ("Looting", 3, 2),
	LOYALTY               ("Loyalty", 3, 1),
	LUCK_OF_THE_SEA       ("Luck of the Sea", 3, 2),
	LURE                  ("Lure", 3, 2),
	MENDING               ("Mending", 1, 2),
	MULTISHOT             ("Multishot", 1, 2),
	PIERCING              ("Piercing", 4, 1),
	POWER                 ("Power", 5, 1),
	PROJECTILE_PROTECTION ("Projectile Protection", 4, 1),
	PROTECTION            ("Protection", 4, 1),
	PUNCH                 ("Punch", 2, 2),
	QUICK_CHARGE          ("Quick Charge", 3, 1),
	RESPIRATION           ("Respiration", 3, 2),
	RIPTIDE               ("Riptide", 3, 2),
	SHARPNESS             ("Sharpness", 5, 1),
	SILK_TOUCH            ("Silk Touch", 1, 4),
	SMITE                 ("Smite", 5, 1),
	SWEEPING_EDGE         ("Sweeping Edge", 3, 2),
	THORNS                ("Thorns", 3, 4),
	UNBREAKING            ("Unbreaking", 3, 1);

	private final String prettyName;
	private final int mMaximumLevel;
	private final int mMultiplierFromBook;

	Enchantment(String prettyName, int maximumLevel, int multiplierFromBook) {
		this.prettyName = prettyName;
		this.mMaximumLevel = maximumLevel;
		this.mMultiplierFromBook = multiplierFromBook;
	}

	public static Enchantment fromPrettyName(String prettyName) {
		return Enchantment.valueOf(prettyName.replaceAll(" ", "_").toUpperCase());
	}

	public String getPrettyName() {
		return prettyName;
	}

	public int getMaximumLevel() {
		return this.mMaximumLevel;
	}

	public int getMultiplierFromBook() {
		return this.mMultiplierFromBook;
	}

}