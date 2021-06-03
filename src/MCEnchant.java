import java.awt.*;
import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.List;

public class MCEnchant {

	static List<Enchantment> minimumEnchantmentCostList = Collections.emptyList();
	static List<Integer> minimumEnchantmentCostOrder = Collections.emptyList();
	static List<Integer> minimumEnchantmentCostLevels = Collections.emptyList();
	static int minimumEnchantmentCost = Integer.MAX_VALUE;
	static int minimumEnchantmentCostExperienceCost = Integer.MAX_VALUE;

	static List<Enchantment> minimumExperienceCostList = Collections.emptyList();
	static List<Integer> minimumExperienceCostOrder = Collections.emptyList();
	static List<Integer> minimumExperienceCostLevels = Collections.emptyList();
	static int minimumExperienceCost = Integer.MAX_VALUE;
	static int minimumExperienceCostEnchantmentCost = Integer.MAX_VALUE;

	static List<Enchantment> maximumEnchantmentCostList = Collections.emptyList();
	static List<Integer> maximumEnchantmentCostOrder = Collections.emptyList();
	static List<Integer> maximumEnchantmentCostLevels = Collections.emptyList();
	static int maximumEnchantmentCost = 0;
	static int maximumEnchantmentCostExperienceCost = 0;

	static List<Enchantment> maximumExperienceCostList = Collections.emptyList();
	static List<Integer> maximumExperienceCostOrder = Collections.emptyList();
	static List<Integer> maximumExperienceCostLevels = Collections.emptyList();
	static int maximumExperienceCost = 0;
	static int maximumExperienceCostEnchantmentCost = 0;

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

	public static void main(String... args) {
		List<Enchantment> baseEnchantments = new ArrayList<>();

		/******* Start of Edits *******/

		/*
		* The following code for opening JAR applications in console is
		* taken from "Frezze98 bolalo" on StackOverflow at the following link:
		* https://stackoverflow.com/questions/7704405/how-do-i-make-my-java-application-open-a-console-terminal-window
		 */
		Console console = System.console();
		if(console == null && !GraphicsEnvironment.isHeadless()) {
			String filename = MCEnchant.class.getProtectionDomain().getCodeSource().getLocation().toString().substring(6);
			try {
				File batch = new File("Launcher.bat");
				if(!batch.exists()){
					batch.createNewFile();
					PrintWriter writer = new PrintWriter(batch);
					writer.println("@echo off");
					writer.println("java -jar " + filename);
					writer.println("exit");
					writer.flush();
				}
				Runtime.getRuntime().exec("cmd /c start \"\" "+batch.getPath());
			} catch(IOException e) {
				e.printStackTrace();
			}
		}

		if (args.length == 0) {
			System.out.println ("Welcome!");
			System.out.println("\n---- Here are the enchantments you can use with this tool: ----");

			StringBuilder strB = new StringBuilder();
			for (Enchantment enchant : Enchantment.values()) {
				strB.append(enchant).append("\n");

			}

			System.out.println(strB.toString().trim());

			System.out.println("\nEnter the enchantments to find the optimal order (separate with SPACE): ");

			Scanner sc = new Scanner(System.in);
			args = sc.nextLine().trim().toUpperCase().split(" ");

		}

		/******* End of Edits *******/

		for (String arg : args) {
			baseEnchantments.add(Enchantment.valueOf(arg));
		}

//		The order of enchantments is unimportant.
//		run(baseEnchantments, baseEnchantments.size());
//		The order of enchantments is important.
		run(baseEnchantments, 1);
		System.out.println("least expensive by level (" + minimumEnchantmentCost + ", " + minimumEnchantmentCostExperienceCost + " xp): " + minimumEnchantmentCostList + " " + minimumEnchantmentCostOrder + " " + minimumEnchantmentCostLevels);
		System.out.println("least expensive by xp (" + minimumExperienceCost + ", " + minimumExperienceCostEnchantmentCost + " levels): " + minimumExperienceCostList + " " + minimumExperienceCostOrder + " " + minimumExperienceCostLevels);
		System.out.println("most expensive by level (" + maximumEnchantmentCost + ", " + maximumEnchantmentCostExperienceCost + " xp): " + maximumEnchantmentCostList + " " + maximumEnchantmentCostOrder + " " + maximumEnchantmentCostLevels);
		System.out.println("most expensive by xp (" + maximumExperienceCost + ", " + maximumExperienceCostEnchantmentCost + " levels): " + maximumExperienceCostList + " " + maximumExperienceCostOrder + " " + maximumEnchantmentCostLevels);
	}
}