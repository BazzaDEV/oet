import javax.swing.*;
import java.awt.event.*;

public class ConfirmCalculateDialog extends JDialog {

    private EnchantGUI mainGUI;

    private JPanel contentPane;
    private JButton buttonOK;
    private JButton buttonCancel;
    private JLabel confirmLabel1;
    private JLabel confirmLabel3;
    private JLabel confirmLabel2;

    public ConfirmCalculateDialog(EnchantGUI mainGUI) {
        this.mainGUI = mainGUI;

        setContentPane(contentPane);
        setModal(true);
        getRootPane().setDefaultButton(buttonOK);

        buttonOK.addActionListener(e -> onOK());

        buttonCancel.addActionListener(e -> onCancel());

        // call onCancel() when cross is clicked
        setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                onCancel();
            }
        });

        // call onCancel() on ESCAPE
        contentPane.registerKeyboardAction(e -> onCancel(), KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0), JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
    }

    public void showDialog() {
        pack();
        setVisible(true);
    }

    private void onOK() {
        dispose();
        mainGUI.calculate();
        mainGUI.showEnchantInstructionsDialog();
    }

    private void onCancel() {
        dispose();
    }

}
