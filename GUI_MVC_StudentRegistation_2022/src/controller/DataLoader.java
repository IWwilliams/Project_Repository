package viewController;

import model.*;

import java.util.ArrayList;
import java.util.Arrays;

public class DataLoader {

    // Helper method
    public static ArrayList<Course> loadCoursesFromDataBase() {
        // Simulating a database!
        Course c1 = new Course("ENSF", 609);
        Course c2 = new Course("ENSF", 610);
        Course c3 = new Course("ENSM", 611);
        Course c4 = new Course("ENSF", 612);
        Course c5 = new Course("ENGG", 613);
        Course c6 = new Course("ENSF", 614);
        Course c7 = new Course("ENGG", 615);
        Course c8 = new Course("ENSF", 616);
        Course c9 = new Course("ENGG", 627);
        Course c10 = new Course("ENSF", 632);
        Course c11 = new Course("ENGG", 650);
        Course c12 = new Course("ENEL", 620);
        Course c13 = new Course("ENGG", 717);

        ArrayList<Course> tempCourseList = new ArrayList<>();
        tempCourseList.add(c1);
        tempCourseList.add(c2);
        tempCourseList.add(c3);
        tempCourseList.add(c4);
        tempCourseList.add(c5);
        tempCourseList.add(c6);
        tempCourseList.add(c7);
        tempCourseList.add(c8);
        tempCourseList.add(c9);
        tempCourseList.add(c10);
        tempCourseList.add(c11);
        tempCourseList.add(c12);
        tempCourseList.add(c13);

        int i = 1;
        for (Course x : tempCourseList) {
            ArrayList<Offering> tempOfferingList = new ArrayList<Offering>();
            tempOfferingList.add(new Offering(1));
            tempOfferingList.add(new Offering(2));
            tempOfferingList.add(new Offering(3));
            tempCourseList.get(tempCourseList.indexOf(x)).setOfferingList(tempOfferingList);
            if (i % 3 == 0) {
                tempCourseList.get(tempCourseList.indexOf(x)).setPreReqs(new ArrayList<Course>(Arrays
                        .asList(tempCourseList.get((int) Math.floor(Math.random() * (tempCourseList.size()))))));

            }
            i %= 3;
            i++;
        }
        return tempCourseList;
    }
}
