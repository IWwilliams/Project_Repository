package viewController;

import view.*;
import model.*;
import java.awt.*;
import java.awt.event.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

public class removeController {
    private removeView theView;
    private CourseCat cat;
    private Student currentUser;

    public removeController(removeView theView, CourseCat cat, Student currentUser) {
        this.theView = theView;
        this.cat = cat;
        this.currentUser = currentUser;
        theView.addCourseListListener(new CourseListListener());
        theView.addGoButtonListener(new goListener());
        theView.addVisibilityListener(new visibilityListener());

    }

    public void generateStudentRegistrations() {
        this.theView.emptyCourseListModel();
        for (Registration r : this.currentUser.getCourseList())
            this.theView.addCourseToList("Course: " + r.getCourseName() + " " + r.getCourseId() + ", Section: "
                    + r.getTheOffering().toString());
    }

    class CourseListListener extends Component implements ListSelectionListener {

        @Override
        public void valueChanged(ListSelectionEvent e) {
            String[] courseInfo = theView.getSelectedElement(theView.getCourseList(), theView.getCourseListModel())
                    .split(" ");
            String section = "";
            Pattern p = Pattern.compile("[section=]([0-9]+)[,]");
            Matcher m = p.matcher(courseInfo[4]);
            while (m.find())
                section = m.group(1);

            if (section.isEmpty())
                return;
            theView.setCourseName(courseInfo[1]);
            theView.setCourseId(courseInfo[2].replace(",", ""));
            theView.setOfferingField(section);
            theView.pack();
        }
    }

    class goListener extends Component implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            if (theView.getCourseName().isEmpty() || theView.getCourseId() == -1 || theView.getOffering() == -1)
                return;

            int scenario = currentUser.deregisterForCourse(cat, theView.getCourseName(), theView.getCourseId(),
                    theView.getOffering());

            if (scenario < 1) {
                theView.setStatus(
                        "Unfortunately the class information you supplied corresponds to nothing you are registered in. Try Again!");
                theView.badStatusColor();
            } else {
                theView.setStatus("Congrats! You have been de-registered from " + theView.getCourseName() + " "
                        + theView.getCourseId());
                theView.goodStatusColor();
            }
            generateStudentRegistrations();
            theView.makeStatusVisible();
            theView.pack();
        }
    }

    class visibilityListener extends ComponentAdapter {
        @Override
        public void componentShown(ComponentEvent e) {
            generateStudentRegistrations();
            theView.makeStatusinVisible();
        }
    }
}
