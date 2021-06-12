import com.formdev.flatlaf.FlatLightLaf;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class EnchantGUI implements ItemListener {

    private final HashSet<Argument> cmdArgs;
    private final HashSet<Enchantment> enchantArgs;

    public EnchantGUI(HashSet<Argument> cmdArgs) {
        this.cmdArgs = cmdArgs;

        enchantArgs = new HashSet<>();
    }

    public void start() {
        // Setup FlatLightLaf themes
        FlatLightLaf.setup();

        // Rest of UI goes here
        JFrame frame = new JFrame();
        frame.setTitle("Optimal Enchant Tool");
        frame.setLayout(new GridLayout(0, 1));
        frame.setSize(600, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JLabel selectEnchantsLabel = new JLabel("Select enchantments from the list below:");
        frame.add(selectEnchantsLabel);

        JPanel enchantSelectPanel = new JPanel();
        enchantSelectPanel.setLayout(new WrapLayout());

        List<JCheckBox> checkBoxes = new ArrayList<>();

        for (Enchantment e : Enchantment.values()) {
            JCheckBox checkBox = new JCheckBox(e.getPrettyName());
            checkBox.addItemListener(this);

            checkBoxes.add(checkBox);
        }

        checkBoxes.forEach(enchantSelectPanel::add);

        frame.add(enchantSelectPanel);

        JButton button = new JButton("Calculate");
        frame.add(button);

        frame.setVisible(true);



    }

    @Override
    public void itemStateChanged(ItemEvent e) {
        // Get the enchantment that was checked/unchecked
        JCheckBox item = (JCheckBox) e.getItemSelectable();
        Enchantment enchantment = Enchantment.fromPrettyName(item.getText());

        // Add or remove the enchantment from the HashSet
        // (add if selected, remove if deselected)
        if (e.getStateChange()==ItemEvent.SELECTED)
            enchantArgs.add(enchantment);

        else if (e.getStateChange()==ItemEvent.DESELECTED)
            enchantArgs.remove(enchantment);

        // Print enchantArgs contents to console to check if this worked
        // enchantArgs.forEach((enchant -> System.out.println(enchant.getPrettyName())));
        // System.out.println();
    }
}
