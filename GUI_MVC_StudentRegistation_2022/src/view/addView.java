package view;

import java.awt.*;
import java.awt.event.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.swing.*;
import javax.swing.event.*;

public class addView extends JFrame {
    private JList courseList;
    private DefaultListModel<String> courseListModel;
    private JList offeringList;
    private DefaultListModel<String> offeringListModel;
    private JPanel layoutPanel = new JPanel();
    private JLabel courseHeader = new JLabel("Select the course you would like to add:");
    private JLabel offeringHeader = new JLabel("Select the offering you would like to add:");
    private JTextArea courseName = new JTextArea(1, 8);
    private JTextArea courseID = new JTextArea(1, 8);
    private JLabel nameLable = new JLabel("Course Name:");
    private JLabel IdLable = new JLabel("Course ID:");
    private JTextArea offeringID = new JTextArea(1, 3);
    private JLabel offeringLable = new JLabel("Offering:");
    private JButton goButton = new JButton("Add Course");
    private JTextArea status = new JTextArea(1, 15);

    public addView() {
        super("Course Adder");
        setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);

        // Adding course list selector
        courseListModel = new DefaultListModel<String>();
        courseList = new JList(courseListModel);
        courseList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        courseList.setSelectedIndex(0);
        courseList.setVisibleRowCount(6);
        JScrollPane courseListScrollPane = new JScrollPane(courseList);

        // Adding offering list selector
        offeringListModel = new DefaultListModel<String>();
        offeringList = new JList(offeringListModel);
        offeringList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        offeringList.setSelectedIndex(0);
        offeringList.setVisibleRowCount(6);
        JScrollPane offeringListScrollPane = new JScrollPane(offeringList);

        // Course Name and Id text Panel
        JPanel courseNameIdPane = new JPanel();
        courseNameIdPane.setLayout(new BoxLayout(courseNameIdPane, BoxLayout.LINE_AXIS));
        courseNameIdPane.add(nameLable);
        courseNameIdPane.add(Box.createHorizontalStrut(10));
        courseNameIdPane.add(courseName);
        courseNameIdPane.add(Box.createHorizontalStrut(5));
        courseNameIdPane.add(new JSeparator(SwingConstants.VERTICAL));
        courseNameIdPane.add(Box.createHorizontalStrut(5));
        courseNameIdPane.add(IdLable);
        courseNameIdPane.add(Box.createHorizontalStrut(10));
        courseNameIdPane.add(courseID);
        courseNameIdPane.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));

        // Section Name and Id text Panel
        JPanel offeringPane = new JPanel();
        offeringPane.setLayout(new BoxLayout(offeringPane, BoxLayout.LINE_AXIS));
        offeringPane.add(Box.createHorizontalStrut(30));
        offeringPane.add(offeringLable);
        offeringPane.add(Box.createHorizontalStrut(10));
        offeringPane.add(offeringID);
        offeringPane.add(Box.createHorizontalStrut(50));
        offeringPane.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));

        // Headers
        courseHeader.setBorder(BorderFactory.createEmptyBorder(2, 2, 15, 2));
        offeringHeader.setBorder(BorderFactory.createEmptyBorder(2, 2, 15, 2));

        JPanel courseInputPanel = new JPanel(new BorderLayout());
        courseInputPanel.add(courseHeader, BorderLayout.NORTH);
        courseInputPanel.add(courseListScrollPane, BorderLayout.CENTER);
        courseInputPanel.add(courseNameIdPane, BorderLayout.SOUTH);

        JPanel offeringInputPanel = new JPanel(new BorderLayout());
        offeringInputPanel.add(offeringHeader, BorderLayout.NORTH);
        offeringInputPanel.add(offeringListScrollPane, BorderLayout.CENTER);
        offeringInputPanel.add(offeringPane, BorderLayout.SOUTH);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new BoxLayout(buttonPanel, BoxLayout.LINE_AXIS));
        buttonPanel.add(goButton);

        status.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
        layoutPanel = new JPanel();
        layoutPanel.setLayout(new BoxLayout(layoutPanel, BoxLayout.PAGE_AXIS));
        layoutPanel.add(courseInputPanel);
        layoutPanel.add(offeringInputPanel);
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

    public void addOfferingListListener(ListSelectionListener listenForSelection) {
        this.offeringList.addListSelectionListener(listenForSelection);
    }

    public String getSelectedCourse() {
        int selectionIndex = this.courseList.getSelectedIndex();
        return this.courseListModel.getElementAt(selectionIndex).toString();
    }

    public String getSelectedOffering() {
        int selectionIndex = this.offeringList.getSelectedIndex();
        return this.offeringListModel.getElementAt(selectionIndex).toString();
    }

    public void setCourseName(String courseName) {
        this.courseName.setText(courseName);
    }

    public void setCourseId(String courseID) {
        this.courseID.setText(courseID);
    }

    public String getCourseName() {
        return this.courseName.getText();
    }

    public int getCourseId() {
        String courseID = this.courseID.getText();
        if (courseID.isEmpty())
            return -1;
        return Integer.parseInt(courseID);
    }

    public int getOffering() {
        String section = this.offeringID.getText();
        Pattern p = Pattern.compile("[section=]([0-9]+)[,]");
        Matcher m = p.matcher(section);
        while (m.find()) {
            return Integer.parseInt(m.group(1));
        }
        return -1;
    }

    public void setOfferingField(String offering) {
        this.offeringID.setText(offering);
    }

    public void addCourseToList(String description) {
        this.courseListModel.addElement(description);
    }

    public void addOfferingToList(String description) {
        try {
            this.offeringListModel.addElement(description);
        } catch (Exception e) {
        }
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

    public void emptyCourseListModel() {
        if (this.offeringListModel.isEmpty())
            return;
        for (Object o : this.offeringListModel.toArray()) {
            try {
                this.offeringListModel.removeElement(o);
            } catch (Exception e) {
            }
        }
    }

    public boolean statusListModel() {
        return this.courseListModel.isEmpty();
    }

    public static void main(String[] args) {
        addView av = new addView();
        av.setVisible(true);
    }
}