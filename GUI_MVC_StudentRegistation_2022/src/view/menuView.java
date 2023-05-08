package view;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.border.Border;

public class menuView extends JFrame {
    private JList list;
    private DefaultListModel<String> listModel;
    private JButton runButton;
    private JTextField Name;
    private JPanel menuPanel;
    private JLabel appHeader = new JLabel("Welcome to the Course Register");
    private JLabel nameEntry = new JLabel("Please Enter Your Name");

    public menuView() {
        super("Course Registrar");
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        menuPanel = new JPanel(new BorderLayout());
        Name = new JTextField(5);

        listModel = new DefaultListModel<String>();
        listModel.addElement("1. Search for the course catalogue");
        listModel.addElement("2. Add course to student courses");
        listModel.addElement("3. Remove course from student courses");
        listModel.addElement("4. View all courses in the catalogue");
        listModel.addElement("5. View all courses taken by the student");
        listModel.addElement("6. Quit");

        // Create the list and put it in a scroll pane.
        list = new JList(listModel);
        list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        list.setSelectedIndex(0);
        // list.addListSelectionListener(this);
        list.setVisibleRowCount(6);
        JScrollPane listScrollPane = new JScrollPane(list);

        JPanel namePane = new JPanel();
        namePane.setLayout(new BoxLayout(namePane, BoxLayout.LINE_AXIS));
        namePane.add(nameEntry);
        namePane.add(Box.createHorizontalStrut(5));
        namePane.add(Name);
        namePane.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));

        appHeader.setAlignmentX(CENTER_ALIGNMENT);
        appHeader.setBorder(BorderFactory.createEmptyBorder(2, 2, 2, 2));
        JPanel greetingLabel = new JPanel();
        greetingLabel.setLayout(new BorderLayout());
        greetingLabel.add(appHeader, BorderLayout.NORTH);
        greetingLabel.add(namePane, BorderLayout.CENTER);

        // Create a panel that uses BoxLayout.
        runButton = new JButton("Go!");
        // runButton.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));

        menuPanel.add(greetingLabel, BorderLayout.NORTH);
        menuPanel.add(listScrollPane, BorderLayout.CENTER);
        menuPanel.add(runButton, BorderLayout.PAGE_END);

        JComponent newContentPane = menuPanel;
        setContentPane(newContentPane);
        pack();
    }

    public void addRunListener(ActionListener listenForRunButton) {
        runButton.addActionListener(listenForRunButton);
    }

    public DefaultListModel<String> getListModel() {
        return this.listModel;
    }

    public String getSelectedElement() {
        int selectionIndex = list.getSelectedIndex();
        return this.listModel.getElementAt(selectionIndex).toString();
    }

    public String getName() {
        return this.Name.getText();
    }

    public void setNameColour(Color c) {
        Border border = BorderFactory.createLineBorder(c, 3);
        this.Name.setBorder(border);
    }
}