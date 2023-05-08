package view;

import javax.swing.*;

public class coursesView extends JFrame {
    private JPanel layoutPanel = new JPanel();
    private JLabel appHeader = new JLabel("Below is a list of all courses:");
    private JTextArea courseOutput = new JTextArea(30, 60);

    public coursesView() {
        super("Available Courses List");
        setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
        JScrollPane scrollPane = new JScrollPane(courseOutput, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS,
                JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);

        layoutPanel = new JPanel();
        appHeader.setAlignmentX(CENTER_ALIGNMENT);
        appHeader.setBorder(BorderFactory.createEmptyBorder(2, 2, 15, 2));

        layoutPanel.setLayout(new BoxLayout(layoutPanel, BoxLayout.PAGE_AXIS));
        layoutPanel.add(appHeader);
        layoutPanel.add(new JSeparator(SwingConstants.HORIZONTAL));
        layoutPanel.add(scrollPane);

        JComponent newContentPane = layoutPanel;
        setContentPane(newContentPane);
        pack();
    }

    public void setCourseOutput(String c) {
        this.courseOutput.setText(c);
    }

    public static void main(String[] args) {
        studentView sv = new studentView();
        sv.setVisible(true);
    }
}