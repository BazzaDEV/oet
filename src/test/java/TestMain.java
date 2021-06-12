import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TestMain {

    public static void main(String[] args) {
        StringBuilder stringBuilder = new StringBuilder();

//		List<Integer> enchantOrder = MCEnchant.minimumEnchantmentCostOrder;
//		List<Enchantment> enchantments = MCEnchant.minimumEnchantmentCostList;

        List<Integer> enchantOrder = Arrays.asList(0, 1, 0, 1, 0, 1, 0);
        List<Enchantment> enchantments = Arrays.asList(Enchantment.SHARPNESS, Enchantment.LOOTING, Enchantment.KNOCKBACK, Enchantment.MENDING, Enchantment.UNBREAKING, Enchantment.SWEEPING_EDGE, Enchantment.FIRE_ASPECT);
        List<String> current = new ArrayList<>();

        current.add(EnchantableItem.SWORD.name());

        for (Enchantment enchantment : enchantments) {
            current.add(enchantment.name());
        }

        stringBuilder.append(current).append("\n");
        stringBuilder.append(enchantOrder).append("\n\n");

        for (int i : enchantOrder) {
            stringBuilder.append("Combine ").append(current.get(i)).append(" with ").append(current.get(i + 1)).append("\n");
            current.set(i+1, current.get(i) + "+" + current.get(i+1));
            current.remove(i);

            stringBuilder.append(current);
            stringBuilder.append("\n\n");
        }

        System.out.println(stringBuilder.toString().trim());
    }
}
