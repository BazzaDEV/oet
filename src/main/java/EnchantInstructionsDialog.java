import javax.swing.*;

public class EnchantInstructionsDialog extends JDialog {
    private JPanel contentPane;
    private JButton buttonOK;
    private JList<String> list1;

    public EnchantInstructionsDialog(String[] instructs) {
        setTitle("Enchanting Instructions");
        setContentPane(contentPane);
        setModal(true);
        getRootPane().setDefaultButton(buttonOK);

        buttonOK.addActionListener(e -> onOK());

        // call onCancel() when cross is clicked
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        list1.setListData(instructs);
    }

    public void showDialog() {
        pack();
        setVisible(true);
    }

    private void onOK() {
        // add your code here
        dispose();
    }
}
