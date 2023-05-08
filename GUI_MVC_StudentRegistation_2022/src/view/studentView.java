package view;

import java.awt.event.*;
import javax.swing.*;

public class studentView extends JFrame {
    private JPanel layoutPanel = new JPanel();
    private JLabel appHeader = new JLabel("Below is a list of the courses for which you are registered");
    private JTextArea courseOutput = new JTextArea(30, 60);

    public studentView() {
        super("Course Finder");
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

    public void setCourseOutput(String s) {
        this.courseOutput.setText(s);
    }

    public void addVisibilityListener(ComponentListener listenForComponent) {
        this.addComponentListener(listenForComponent);
    }

}