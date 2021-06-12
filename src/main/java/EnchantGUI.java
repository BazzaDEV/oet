import com.formdev.flatlaf.FlatLightLaf;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class EnchantGUI extends JFrame implements ItemListener {

    // cmdArgs has no use yet for GUI, but here for future purposes
    private final HashSet<Argument> cmdArgs;
    private final HashSet<Enchantment> enchantArgs;

    private JPanel contentPane;
    private JButton calculateButton;

    private JTabbedPane tabbedPane1;
    private JPanel selectEnchantPanel;


    public EnchantGUI(String title, HashSet<Argument> cmdArgs) {
        super(title);

        this.cmdArgs = cmdArgs;
        enchantArgs = new HashSet<>();

        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
        this.setContentPane(contentPane);
        this.pack();

        calculateButton.addActionListener(e -> calculate());
    }

    public void start() {
        // Setup FlatLightLaf themes
        FlatLightLaf.setup();

        // Rest of UI goes here
        this.setMinimumSize(new Dimension(500, 550));
        this.setMaximumSize(new Dimension(500, 550));

        selectEnchantPanel.setLayout(new WrapLayout());

        List<JCheckBox> checkBoxes = new ArrayList<>();

        for (Enchantment e : Enchantment.values()) {
            JCheckBox checkBox = new JCheckBox(e.getPrettyName());
            checkBox.addItemListener(this);

            checkBoxes.add(checkBox);
        }

        checkBoxes.forEach(selectEnchantPanel::add);
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

    public void calculate() {
        Enchantment[] enchantsArr = enchantArgs.toArray(new Enchantment[0]);
        List<Enchantment> enchantments = new ArrayList<>(Arrays.asList(enchantsArr));

        MCEnchant.run(enchantments, enchantArgs.size());

        System.out.println("least expensive by level (" + MCEnchant.minimumEnchantmentCost + " levels): " + MCEnchant.minimumEnchantmentCostList + " " + MCEnchant.minimumEnchantmentCostOrder + " " + MCEnchant.minimumEnchantmentCostLevels);
        System.out.println(MCEnchant.instructions());
    }

    public static void main(String[] args) {
        EnchantGUI frame = new EnchantGUI("Optimal Enchant Tool", new HashSet<>());
        frame.start();
        frame.setVisible(true);
    }
}
