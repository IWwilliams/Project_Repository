package view;

import java.awt.*;
import javax.swing.*;
import javax.swing.event.*;
import java.awt.event.*;

public class selectView extends JFrame {
    private JList list;
    private DefaultListModel<String> listModel;
    private JPanel layoutPanel = new JPanel();
    private JLabel appHeader = new JLabel("Select the course for which you would like to know more information:");
    private JTextArea courseOutput = new JTextArea(8, 30);
    private JTextArea courseName = new JTextArea(1, 30);
    private JTextArea courseID = new JTextArea(1, 8);
    private JLabel nameLable = new JLabel("Course Name:");
    private JLabel IdLable = new JLabel("Course ID:");

    public selectView() {
        super("Course Finder");
        setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);

        listModel = new DefaultListModel<String>();
        list = new JList(listModel);
        list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        list.setSelectedIndex(0);
        list.setVisibleRowCount(6);
        JScrollPane listScrollPane = new JScrollPane(list);

        JPanel courseNameIdPane = new JPanel();
        courseNameIdPane.setLayout(new BoxLayout(courseNameIdPane, BoxLayout.LINE_AXIS));
        courseNameIdPane.add(nameLable);
        courseNameIdPane.add(courseName);
        courseNameIdPane.add(Box.createHorizontalStrut(5));
        courseNameIdPane.add(new JSeparator(SwingConstants.VERTICAL));
        courseNameIdPane.add(Box.createHorizontalStrut(5));
        courseNameIdPane.add(IdLable);
        courseNameIdPane.add(courseID);
        courseNameIdPane.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));

        appHeader.setAlignmentX(CENTER_ALIGNMENT);
        appHeader.setBorder(BorderFactory.createEmptyBorder(2, 2, 15, 2));

        JPanel courseInputPanel = new JPanel(new BorderLayout());
        courseInputPanel.add(appHeader, BorderLayout.NORTH);
        courseInputPanel.add(listScrollPane, BorderLayout.CENTER);
        courseInputPanel.add(courseNameIdPane, BorderLayout.SOUTH);

        layoutPanel = new JPanel();
        layoutPanel.setLayout(new BoxLayout(layoutPanel, BoxLayout.PAGE_AXIS));
        layoutPanel.add(courseInputPanel);
        layoutPanel.add(courseOutput);

        JComponent newContentPane = layoutPanel;
        setContentPane(newContentPane);
        pack();
    }

    public void addVisibilityListener(ComponentListener listenForComponent) {
        this.addComponentListener(listenForComponent);
    }

    public void addListListener(ListSelectionListener listenForSelection) {
        list.addListSelectionListener(listenForSelection);
    }

    public String getSelectedElement() {
        int selectionIndex = list.getSelectedIndex();
        return this.listModel.getElementAt(selectionIndex).toString();
    }

    public void setCourseName(String courseName) {
        this.courseName.setText(courseName);
    }

    public void setCourseId(String courseID) {
        this.courseID.setText(courseID);
    }

    public void setcourseOutput(String courseOutput) {
        this.courseOutput.setText(courseOutput);
    }

    public void addCourseToList(String description) {
        this.listModel.addElement(description);
    }

    public boolean statusListModel() {
        return this.listModel.isEmpty();
    }

    public static void main(String[] args) {

    }
}