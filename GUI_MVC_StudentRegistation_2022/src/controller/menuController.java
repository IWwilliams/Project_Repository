package viewController;

import view.*;
import model.Student;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class menuController {
    private menuView theView;
    private addView av;
    private studentView studentV;
    private selectView sv;
    private removeView rv;
    private coursesView cv;
    private Student currentUser;

    public menuController(menuView theView, Student currentUser, addView av, studentView studentV, selectView sv,
            removeView rv, coursesView cv) {
        this.theView = theView;
        this.av = av;
        this.cv = cv;
        this.studentV = studentV;
        this.sv = sv;
        this.rv = rv;
        this.currentUser = currentUser;
        theView.addRunListener(new RunListener());
    }

    class RunListener extends Component implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            theView.setNameColour(Color.WHITE);
            if (theView.getName().isEmpty()) {
                theView.setNameColour(Color.RED);
                return;
            }

            String operation = theView.getSelectedElement();
            Integer operationId = Character.getNumericValue(operation.charAt(0));
            String Name = theView.getName();

            currentUser.setName(Name);
            switch (operationId) {
                case 1:
                    sv.setVisible(true);
                    break;
                case 2:
                    av.setVisible(true);
                    break;
                case 3:
                    rv.setVisible(true);
                    break;
                case 4:
                    cv.setVisible(true);
                    break;
                case 5:
                    studentV.setVisible(true);
                    break;
                case 6:
                    System.exit(0);
                    break;
            }
        }
    }
}
