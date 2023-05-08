package viewController;

import view.*;
import model.CourseCat;

public class coursesController {
    private coursesView theView;

    public coursesController(coursesView theView, CourseCat cat) {
        this.theView = theView;
        theView.setCourseOutput(cat.toString());
    }
}
