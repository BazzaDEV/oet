import utils.TextUtils;

import java.awt.*;
import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;

public class EnchantCLI {

    HashSet<Argument> cmdArgs;
    HashSet<Enchantment> enchantArgs;

    public static void main(String[] args) {
        new EnchantCLI().run(args);
    }

    private void run(String[] args) { {
        cmdArgs = new HashSet<>();
        enchantArgs = new HashSet<>();

        for (String arg : args) {
            if (arg.startsWith("--")) { // this is a program argument
                cmdArgs.add(Argument.fromArgument(arg));
            } else { // this is an enchantment
                enchantArgs.add(Enchantment.valueOf(arg));
            }
        }

        if (!cmdArgs.contains(Argument.SKIP_LAUNCHER))
            launchConsole();

        if (enchantArgs.isEmpty()) { // No enchant args, send to CLI menu
            Menu menu = Menu.create()
                    .setTitle("Optimal Enchant Tool")
                    .setText(
                            MenuText.create()
                                    .newLine("Welcome!")
                                    .build())
                    .addOption(
                            MenuOption.create()
                                    .setKey('V').setText("View Enchantments")
                                    .setAction(this::printEnchantments)
                                    .build())
                    .addOption(
                            MenuOption.create()
                                    .setKey('C').setText("Calculate")
                                    .setAction(() -> {
                                        List<Enchantment> enchantments = getEnchantmentsFromUser();
                                        runCalculation(enchantments);
            })
                                    .build())
                    .addOption(
                            MenuOption.create()
                                    .setKey('Q').setText("Quit")
                                    .setAction(this::exit)
                                    .build())
                    .build();

            menu.runMenu();
        }



    }



    }

    private void launchConsole() {
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
    }

    private void printEnchantments() {
        StringBuilder stringBuilder = new StringBuilder();
        for (Enchantment e : Enchantment.values()) {
            stringBuilder.append("\n").append(e);
        }

        System.out.println(stringBuilder.toString().trim());
    }

    private List<Enchantment> getEnchantmentsFromUser() {
        System.out.println("Enter the enchantments to find the optimal order (separate with SPACE): ");

        Scanner sc = new Scanner(System.in);
        String[] inputEnchants = sc.nextLine().toUpperCase().trim().split(" ");

        for (String s : inputEnchants) {
            enchantArgs.add(Enchantment.valueOf(s));
        }

        return new ArrayList<>(enchantArgs);
    }

    private void runCalculation(List<Enchantment> enchantments) {
        // The order of enchantments is unimportant.
        MCEnchant.run(enchantments, enchantments.size());

        // The order of enchantments is important.
        // MCEnchant.run(enchantments, 1);

        System.out.println("least expensive by level (" + MCEnchant.minimumEnchantmentCost + ", " + MCEnchant.minimumEnchantmentCostExperienceCost + " xp): " + MCEnchant.minimumEnchantmentCostList + " " + MCEnchant.minimumEnchantmentCostOrder + " " + MCEnchant.minimumEnchantmentCostLevels);
        System.out.println("least expensive by xp (" + MCEnchant.minimumExperienceCost + ", " + MCEnchant.minimumExperienceCostEnchantmentCost + " levels): " + MCEnchant.minimumExperienceCostList + " " + MCEnchant.minimumExperienceCostOrder + " " + MCEnchant.minimumExperienceCostLevels);
        System.out.println("most expensive by level (" + MCEnchant.maximumEnchantmentCost + ", " + MCEnchant.maximumEnchantmentCostExperienceCost + " xp): " + MCEnchant.maximumEnchantmentCostList + " " + MCEnchant.maximumEnchantmentCostOrder + " " + MCEnchant.maximumEnchantmentCostLevels);
        System.out.println("most expensive by xp (" + MCEnchant.maximumExperienceCost + ", " + MCEnchant.maximumExperienceCostEnchantmentCost + " levels): " + MCEnchant.maximumExperienceCostList + " " + MCEnchant.maximumExperienceCostOrder + " " + MCEnchant.maximumEnchantmentCostLevels);

    }

    private void exit() {
        TextUtils.clearScreen();
        System.exit(1);
    }
}
