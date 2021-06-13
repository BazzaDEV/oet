import java.util.*;

/*************************************************************************************
 *
 * All credit for the majority of this class goes to scudobuio on Reddit:
 * https://www.reddit.com/user/scudobuio/
 *
 * It was released publicly on a Pastebin at the following link:
 * https://pastebin.com/UFsznYuW
 *
 *************************************************************************************/

public class MCEnchant {

	static List<Enchantment> minimumEnchantmentCostList;
	static List<Integer> minimumEnchantmentCostOrder;
	static List<Integer> minimumEnchantmentCostLevels;
	static int minimumEnchantmentCost;
	static int minimumEnchantmentCostExperienceCost;

	static List<Enchantment> minimumExperienceCostList;
	static List<Integer> minimumExperienceCostOrder;
	static List<Integer> minimumExperienceCostLevels;
	static int minimumExperienceCost;
	static int minimumExperienceCostEnchantmentCost;

	static List<Enchantment> maximumEnchantmentCostList;
	static List<Integer> maximumEnchantmentCostOrder;
	static List<Integer> maximumEnchantmentCostLevels;
	static int maximumEnchantmentCost;
	static int maximumEnchantmentCostExperienceCost;

	static List<Enchantment> maximumExperienceCostList;
	static List<Integer> maximumExperienceCostOrder;
	static List<Integer> maximumExperienceCostLevels;
	static int maximumExperienceCost;
	static int maximumExperienceCostEnchantmentCost;

	static int getExperienceCost(int enchantmentCost) {
		if (enchantmentCost <= 16) {
			return (int)((enchantmentCost * enchantmentCost) + (6 * enchantmentCost));
		}
		if (enchantmentCost <= 31) {
			return (int)((2.5 * enchantmentCost * enchantmentCost) - (40.5 * enchantmentCost)  + 360);
		}
		return (int)((4.5 * enchantmentCost * enchantmentCost) + (162.5 * enchantmentCost) + 2220);
	}

	static int getPriorWorkPenalty(int priorWorkCount) {
		return ((1 << priorWorkCount) - 1);
	}

	static int getEnchantmentCost(
		List<Enchantment> targetEnchantments,
		int targetPriorWorkCount,
		List<Enchantment> sacrificeEnchantments,
		int sacrificePriorWorkCount
	) {
		int enchantmentCost = getPriorWorkPenalty(targetPriorWorkCount) + getPriorWorkPenalty(sacrificePriorWorkCount);
		for (Enchantment sacrificeEnchantment : sacrificeEnchantments) {
			enchantmentCost += sacrificeEnchantment.getMultiplierFromBook() * sacrificeEnchantment.getMaximumLevel();
		}
		return enchantmentCost;
	}

	static void combine(
		List<List<Enchantment>> enchantmentsLists,
		List<Integer> priorWorkCounts,
		Deque<Integer> targetIndexes,
		Deque<Integer> enchantmentCosts
	) {
		int enchantmentsListsCount = enchantmentsLists.size();
		if (enchantmentsListsCount == 1) {
			int totalEnchantmentCost = 0;
			int totalExperienceCost = 0;
			for (int enchantmentCost : enchantmentCosts) {
				totalEnchantmentCost += enchantmentCost;
				totalExperienceCost += getExperienceCost(enchantmentCost);
			}
			if (
				(totalEnchantmentCost < minimumEnchantmentCost) ||
				((totalEnchantmentCost == minimumEnchantmentCost) && (totalExperienceCost < minimumEnchantmentCostExperienceCost))
			) {
				minimumEnchantmentCostList = enchantmentsLists.get(0);
				minimumEnchantmentCostOrder = new ArrayList<>(targetIndexes);
				Collections.reverse(minimumEnchantmentCostOrder);
				minimumEnchantmentCostLevels = new ArrayList<>(enchantmentCosts);
				Collections.reverse(minimumEnchantmentCostLevels);
				minimumEnchantmentCost = totalEnchantmentCost;
				minimumEnchantmentCostExperienceCost = totalExperienceCost;
			}
			if (
				(totalExperienceCost < minimumExperienceCost) ||
				((totalExperienceCost == minimumExperienceCost) && (totalEnchantmentCost < minimumExperienceCostEnchantmentCost))
			) {
				minimumExperienceCostList = enchantmentsLists.get(0);
				minimumExperienceCostOrder = new ArrayList<>(targetIndexes);
				Collections.reverse(minimumExperienceCostOrder);
				minimumExperienceCostLevels = new ArrayList<>(enchantmentCosts);
				Collections.reverse(minimumExperienceCostLevels);
				minimumExperienceCost = totalExperienceCost;
				minimumExperienceCostEnchantmentCost = totalEnchantmentCost;
			}
			if (
				(totalEnchantmentCost > maximumEnchantmentCost) ||
				((totalEnchantmentCost == maximumEnchantmentCost) && (totalExperienceCost > maximumEnchantmentCostExperienceCost))
			) {
				maximumEnchantmentCostList = enchantmentsLists.get(0);
				maximumEnchantmentCostOrder = new ArrayList<>(targetIndexes);
				Collections.reverse(maximumEnchantmentCostOrder);
				maximumEnchantmentCostLevels = new ArrayList<>(enchantmentCosts);
				Collections.reverse(maximumEnchantmentCostLevels);
				maximumEnchantmentCost = totalEnchantmentCost;
				maximumEnchantmentCostExperienceCost = totalExperienceCost;
			}
			if (
				(totalExperienceCost > maximumExperienceCost) ||
				((totalExperienceCost == maximumExperienceCost) && (totalEnchantmentCost > maximumExperienceCostEnchantmentCost))
			) {
				maximumExperienceCostList = enchantmentsLists.get(0);
				maximumExperienceCostOrder = new ArrayList<>(targetIndexes);
				Collections.reverse(maximumExperienceCostOrder);
				maximumExperienceCostLevels = new ArrayList<>(enchantmentCosts);
				Collections.reverse(maximumExperienceCostLevels);
				maximumExperienceCost = totalExperienceCost;
				maximumExperienceCostEnchantmentCost = totalEnchantmentCost;
			}
			return;
		}
		for (int i = 0; i < enchantmentsListsCount - 1; i++) {
			List<List<Enchantment>> combinedEnchantmentsLists = new ArrayList<>();
			List<Integer> combinedPriorWorkCounts = new ArrayList<>();
			combinedEnchantmentsLists.addAll(enchantmentsLists.subList(0, i));
			combinedPriorWorkCounts.addAll(priorWorkCounts.subList(0, i));
			List<Enchantment> targetEnchantments = enchantmentsLists.get(i);
			int targetPriorWorkCount = priorWorkCounts.get(i);
			List<Enchantment> sacrificeEnchantments = enchantmentsLists.get(i + 1);
			int sacrificePriorWorkCount = priorWorkCounts.get(i + 1);
			List<Enchantment> combinedEnchantments = new ArrayList<>();
			combinedEnchantments.addAll(targetEnchantments);
			combinedEnchantments.addAll(sacrificeEnchantments);
			combinedEnchantmentsLists.add(combinedEnchantments);
			combinedPriorWorkCounts.add(Math.max(targetPriorWorkCount, sacrificePriorWorkCount) + 1);
			combinedEnchantmentsLists.addAll(enchantmentsLists.subList(i+2, enchantmentsListsCount));
			combinedPriorWorkCounts.addAll(priorWorkCounts.subList(i+2, enchantmentsListsCount));
			targetIndexes.push(i);
			enchantmentCosts.push(getEnchantmentCost(targetEnchantments, targetPriorWorkCount, sacrificeEnchantments, sacrificePriorWorkCount));
			combine(combinedEnchantmentsLists, combinedPriorWorkCounts, targetIndexes, enchantmentCosts);
			targetIndexes.pop();
			enchantmentCosts.pop();
		}
	}

	public static void run(List<Enchantment> baseEnchantments, int count) {

		initialize();

		if (count == 1) {
			int baseEnchantmentsCount = baseEnchantments.size();
			List<List<Enchantment>> enchantmentsLists = new ArrayList<>(baseEnchantmentsCount + 1);
			List<Integer> priorWorkCounts = new ArrayList<>(baseEnchantmentsCount + 1);
			enchantmentsLists.add(Collections.emptyList());
			priorWorkCounts.add(0);
			for (Enchantment baseEnchantment : baseEnchantments) {
				enchantmentsLists.add(Collections.singletonList(baseEnchantment));
				priorWorkCounts.add(0);
			}
			Deque<Integer> targetIndexes = new ArrayDeque<>();
			Deque<Integer> enchantmentCosts = new ArrayDeque<>();
			combine(enchantmentsLists, priorWorkCounts, targetIndexes, enchantmentCosts);
		} else {
			run(baseEnchantments, count - 1);
			for (int i = 0; i < count - 1; i++) {
				if ((i % 2) == 0) {
					baseEnchantments.set(i, baseEnchantments.set(count - 1, baseEnchantments.get(i)));
				} else {
					baseEnchantments.set(0, baseEnchantments.set(count - 1, baseEnchantments.get(0)));
				}
				run(baseEnchantments, count - 1);
			}
		}
	}

	public static String[] instructions() {
		List<String> instructs = new ArrayList<>();

		List<Integer> enchantOrder = MCEnchant.minimumEnchantmentCostOrder;
		List<Integer> enchantCost = MCEnchant.minimumEnchantmentCostLevels;
		List<Enchantment> enchantments = MCEnchant.minimumEnchantmentCostList;
//		List<Integer> enchantOrder = Arrays.asList(0, 1, 0, 1, 0, 1, 0);
//		List<Enchantment> enchantments = Arrays.asList(Enchantment.SHARPNESS, Enchantment.LOOTING, Enchantment.KNOCKBACK, Enchantment.MENDING, Enchantment.UNBREAKING, Enchantment.SWEEPING_EDGE, Enchantment.FIRE_ASPECT);

		List<String> current = new ArrayList<>();

		current.add(EnchantableItem.SWORD.getItemName());

		for (Enchantment enchantment : enchantments) {
			current.add(enchantment.getPrettyName());
		}

		instructs.add("Gather the required books and tool/weapon/armor to enchant: ");
		instructs.add(String.valueOf(current));
		instructs.add(" ");
		// instructs.add(String.valueOf(enchantOrder));

		// stringBuilder.append(current).append("\n");
		// stringBuilder.append(enchantOrder).append("\n\n");

		int stepNumber = 1;
		for (int i : enchantOrder) {
			instructs.add("Step " + stepNumber + ": ");
			instructs.add("Combine '" + current.get(i) + "' with '" + current.get(i + 1) + "'");
			instructs.add("Cost -> " + enchantCost.get(stepNumber-1) + " levels");
			// stringBuilder.append("Combine ").append(current.get(i)).append(" with ").append(current.get(i + 1)).append("\n");

			current.set(i+1, current.get(i) + " + " + current.get(i+1));
			current.remove(i);

			instructs.add(String.valueOf(current));
			instructs.add(" ");

			stepNumber++;
			// stringBuilder.append(current);
			// stringBuilder.append("\n\n");
		}

		instructs.add("Total Cost: " + enchantCost.stream().reduce(0, Integer::sum) + " levels");

		String[] res = new String[instructs.size()];

		int i = 0;
		for (String instruct : instructs) {
			res[i++] = instruct;
		}

		return res;
		// return stringBuilder.toString().trim();
	}

	public static void initialize() {
		minimumEnchantmentCostList = Collections.emptyList();
		minimumEnchantmentCostOrder = Collections.emptyList();
		minimumEnchantmentCostLevels = Collections.emptyList();
		minimumEnchantmentCost = Integer.MAX_VALUE;
		minimumEnchantmentCostExperienceCost = Integer.MAX_VALUE;

		minimumExperienceCostList = Collections.emptyList();
		minimumExperienceCostOrder = Collections.emptyList();
		minimumExperienceCostLevels = Collections.emptyList();
		minimumExperienceCost = Integer.MAX_VALUE;
		minimumExperienceCostEnchantmentCost = Integer.MAX_VALUE;

		maximumEnchantmentCostList = Collections.emptyList();
		maximumEnchantmentCostOrder = Collections.emptyList();
		maximumEnchantmentCostLevels = Collections.emptyList();
		maximumEnchantmentCost = 0;
		maximumEnchantmentCostExperienceCost = 0;

		maximumExperienceCostList = Collections.emptyList();
		maximumExperienceCostOrder = Collections.emptyList();
		maximumExperienceCostLevels = Collections.emptyList();
		maximumExperienceCost = 0;
		maximumExperienceCostEnchantmentCost = 0;
	}
}