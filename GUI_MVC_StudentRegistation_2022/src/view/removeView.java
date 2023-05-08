package view;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.event.*;

public class removeView extends JFrame {
    private JList courseList;
    private DefaultListModel<String> courseListModel;
    private JPanel layoutPanel = new JPanel();
    private JLabel Header = new JLabel("Select the course registration you would like to remove:");
    private JTextArea courseName = new JTextArea(1, 8);
    private JTextArea courseID = new JTextArea(1, 8);
    private JLabel nameLable = new JLabel("Course Name:");
    private JLabel IdLable = new JLabel("Course ID:");
    private JTextArea offeringID = new JTextArea(1, 8);
    private JLabel offeringLable = new JLabel("Offering:");
    private JButton goButton = new JButton("Remove Course");
    private JTextArea status = new JTextArea(1, 15);

    public removeView() {
        super("Course Remover");
        setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);

        // Adding course list selector
        courseListModel = new DefaultListModel<String>();
        courseList = new JList(courseListModel);
        courseList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        courseList.setSelectedIndex(0);
        courseList.setVisibleRowCount(6);
        JScrollPane courseListScrollPane = new JScrollPane(courseList);

        // Course Name and Id text Panel
        JPanel coursePane = new JPanel();
        coursePane.setLayout(new BoxLayout(coursePane, BoxLayout.LINE_AXIS));
        coursePane.add(nameLable);
        coursePane.add(Box.createHorizontalStrut(10));
        coursePane.add(courseName);
        coursePane.add(Box.createHorizontalStrut(5));
        coursePane.add(new JSeparator(SwingConstants.VERTICAL));
        coursePane.add(Box.createHorizontalStrut(5));
        coursePane.add(IdLable);
        coursePane.add(Box.createHorizontalStrut(10));
        coursePane.add(courseID);
        coursePane.add(Box.createHorizontalStrut(5));
        coursePane.add(new JSeparator(SwingConstants.VERTICAL));
        coursePane.add(Box.createHorizontalStrut(5));
        coursePane.add(offeringLable);
        coursePane.add(Box.createHorizontalStrut(10));
        coursePane.add(offeringID);
        coursePane.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));

        // Section Name and Id text Panel

        // Headers

        Header.setBorder(BorderFactory.createEmptyBorder(2, 2, 15, 2));
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.add(Header, BorderLayout.CENTER);

        JPanel courseInputPanel = new JPanel(new BorderLayout());
        courseInputPanel.add(headerPanel, BorderLayout.NORTH);
        courseInputPanel.add(courseListScrollPane, BorderLayout.CENTER);
        courseInputPanel.add(coursePane, BorderLayout.SOUTH);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new BoxLayout(buttonPanel, BoxLayout.LINE_AXIS));
        buttonPanel.add(goButton);

        status.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
        layoutPanel = new JPanel();
        layoutPanel.setLayout(new BoxLayout(layoutPanel, BoxLayout.PAGE_AXIS));
        layoutPanel.add(courseInputPanel);
        layoutPanel.add(buttonPanel);
        layoutPanel.add(status);

        status.setVisible(false);
        JComponent newContentPane = layoutPanel;
        setContentPane(newContentPane);
        pack();
    }

    public void addVisibilityListener(ComponentListener listenForComponent) {
        this.addComponentListener(listenForComponent);
    }

    public void addGoButtonListener(ActionListener listener) {
        this.goButton.addActionListener(listener);
    }

    public void addCourseListListener(ListSelectionListener listenForSelection) {
        this.courseList.addListSelectionListener(listenForSelection);
    }

    public String getSelectedElement(JList list, DefaultListModel<String> listModel) {
        int selectionIndex = list.getSelectedIndex();
        return listModel.getElementAt(selectionIndex).toString();
    }

    public void setCourseName(String courseName) {
        this.courseName.setText(courseName);
    }

    public void emptyCourseListModel() {
        if (this.courseListModel.isEmpty())
            return;
        for (Object o : this.courseListModel.toArray()) {
            try {
                this.courseListModel.removeElement(o);
            } catch (Exception e) {
            }
        }
    }

    public void setCourseId(String courseID) {
        this.courseID.setText(courseID);
    }

    public String getCourseName() {
        return this.courseName.getText();
    }

    public int getOffering() {
        String offeringID = this.offeringID.getText();
        if (offeringID.isEmpty())
            return -1;
        return Integer.parseInt(this.offeringID.getText());
    }

    public int getCourseId() {
        String courseID = this.courseID.getText();
        if (courseID.isEmpty())
            return -1;
        return Integer.parseInt(courseID);
    }

    public void setOfferingField(String offering) {
        this.offeringID.setText(offering);
    }

    public void addCourseToList(String description) {
        try {
            this.courseListModel.addElement(description);
        } catch (Exception e) {
        }
    }

    public JList getCourseList() {
        return this.courseList;
    }

    public DefaultListModel<String> getCourseListModel() {
        return this.courseListModel;
    }

    public void setStatus(String description) {
        this.status.setText(description);
    }

    public void makeStatusVisible() {
        this.status.setVisible(true);
    }

    public void makeStatusinVisible() {
        this.status.setVisible(false);
    }

    public void goodStatusColor() {
        this.status.setBackground(Color.GREEN);
    }

    public void badStatusColor() {
        this.status.setBackground(Color.RED);
    }

    public void warningStatusColor() {
        this.status.setBackground(Color.YELLOW);
    }

}
