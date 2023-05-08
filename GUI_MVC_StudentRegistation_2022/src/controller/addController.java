package viewController;

import view.*;
import model.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.event.*;

public class addController {
    private addView theView;
    private CourseCat cat;
    private Student currentUser;

    public addController(addView theView, CourseCat cat, Student currentUser) {
        this.theView = theView;
        this.cat = cat;
        this.currentUser = currentUser;
        theView.addCourseListListener(new CourseListListener());
        theView.addOfferingListListener(new OfferingListListener());
        theView.addGoButtonListener(new goListener());
        theView.addVisibilityListener(new visibilityListener());
    }

    class CourseListListener extends Component implements ListSelectionListener {

        @Override
        public void valueChanged(ListSelectionEvent e) {
            String[] courseInfo = theView.getSelectedCourse()
                    .split(" ");
            if (courseInfo.length != 2)
                return;
            theView.setCourseName(courseInfo[0]);
            theView.setCourseId(courseInfo[1]);
            Course theCourse = cat.searchCat(courseInfo[0], Integer.parseInt(courseInfo[1]));
            theView.emptyCourseListModel();

            for (Offering o : theCourse.getOfferingList())
                theView.addOfferingToList(o.toString());
            theView.setOfferingField("");
            theView.pack();
        }
    }

    class OfferingListListener extends Component implements ListSelectionListener {

        @Override
        public void valueChanged(ListSelectionEvent e) {
            String offeringInfo = theView.getSelectedOffering();
            theView.setOfferingField(offeringInfo.trim());
            theView.pack();
        }
    }

    class goListener extends Component implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            if (theView.getCourseName().isEmpty() || theView.getCourseId() == -1 || theView.getOffering() == -1)
                return;

            int scenario = currentUser.registerForCourse(cat, theView.getCourseName(), theView.getCourseId(),
                    theView.getOffering());

            if (scenario == 0) {
                theView.setStatus(
                        "Unfortunately the class information you supplied corresponds to nothing that is being offered. Try Again!");
                theView.badStatusColor();
            } else if (scenario == 1) {
                theView.setStatus("It appears you are already registered in this course and section.");
                theView.warningStatusColor();
            } else if (scenario == 2) {
                theView.setStatus("Unfortunately " + currentUser.getName()
                        + ", you are registered for the maximum number of courses. \nPlease review your current registrations to add this item.");
                theView.badStatusColor();
            } else {
                theView.setStatus("Congrats! You have been registered in " + theView.getCourseName() + " "
                        + theView.getCourseId());
                theView.goodStatusColor();
            }
            theView.makeStatusVisible();
            theView.pack();
        }
    }

    class visibilityListener extends ComponentAdapter {
        @Override
        public void componentShown(ComponentEvent e) {
            if (theView.statusListModel()) {
                for (Course c : cat.getCourseList())
                    theView.addCourseToList(c.getCourseNameId());
            }
            theView.makeStatusinVisible();
        }
    }
}
