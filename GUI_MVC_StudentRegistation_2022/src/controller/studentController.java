package viewController;

import view.*;
import model.Student;
import java.awt.event.*;

public class studentController {
    private studentView theView;
    private Student currentUser;

    public studentController(studentView theView, Student currentUser) {
        this.theView = theView;
        this.currentUser = currentUser;
        theView.addVisibilityListener(new visibilityListener());
    }

    class visibilityListener extends ComponentAdapter {
        @Override
        public void componentShown(ComponentEvent e) {
            theView.setCourseOutput(currentUser.toString());
        }
    }
}
