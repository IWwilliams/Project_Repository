package viewController;

import view.*;
import model.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.event.*;

public class selectController {
    private selectView theView;
    private CourseCat cat;

    public selectController(selectView theView, CourseCat cat) {
        this.theView = theView;
        this.cat = cat;
        theView.addListListener(new ListListener());
        theView.addVisibilityListener(new visibilityListener());
    }

    class ListListener extends Component implements ListSelectionListener {

        @Override
        public void valueChanged(ListSelectionEvent e) {
            String[] courseInfo = theView.getSelectedElement().split(" ");
            if (courseInfo.length != 2)
                return;
            theView.setCourseName(courseInfo[0]);
            theView.setCourseId(courseInfo[1]);
            Course theCourse = cat.searchCat(courseInfo[0], Integer.parseInt(courseInfo[1]));
            theView.setcourseOutput(theCourse.toString());
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
        }
    }
}
