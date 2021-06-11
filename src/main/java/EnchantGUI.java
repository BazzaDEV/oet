import com.formdev.flatlaf.FlatLightLaf;

import java.util.HashSet;

public class EnchantGUI {

    private HashSet<Argument> cmdArgs;
    private HashSet<Enchantment> enchantArgs;

    public EnchantGUI(HashSet<Argument> cmdArgs) {
        this.cmdArgs = cmdArgs;

        enchantArgs = new HashSet<>();
    }

    public void start() {
        // Setup FlatLightLaf themes
        FlatLightLaf.setup();

        // Rest of UI goes here

    }
}
