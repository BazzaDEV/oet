import java.util.HashSet;

public class Main {
    public static void main(String... args) {

        HashSet<Argument> cmdArgs;
        HashSet<Enchantment> enchantArgs;

        cmdArgs = new HashSet<>();
        enchantArgs = new HashSet<>();

        for (String arg : args) {
            if (arg.startsWith("--")) { // this is a program argument
                cmdArgs.add(Argument.fromArgument(arg));
            } else { // this is an enchantment
                enchantArgs.add(Enchantment.valueOf(arg));
            }
        }

        if (cmdArgs.isEmpty() && enchantArgs.isEmpty())
            new EnchantGUI(cmdArgs).start();

        else if (cmdArgs.contains(Argument.NO_GUI))
            new EnchantCLI(cmdArgs, enchantArgs).start();

    }
}
