package viewController;

import java.util.ArrayList;

import model.*;
import view.addView;
import view.coursesView;
import view.menuView;
import view.removeView;
import view.selectView;
import view.studentView;

public class Main {
  public static void ObjectInitilizer(CourseCat cat) {
    ArrayList<Student> fakeStudents = new ArrayList<Student>();
    fakeStudents.add(new Student("32423", 1));
    fakeStudents.add(new Student("1243123", 2));
    fakeStudents.add(new Student("1324123", 3));
    fakeStudents.add(new Student("3241324", 4));
    fakeStudents.add(new Student("1234213", 5));
    fakeStudents.add(new Student("3145y56", 6));
    fakeStudents.add(new Student("Ja1634trgeqf", 7));
    fakeStudents.add(new Student("S341trfedas", 8));
    fakeStudents.add(new Student("regwfdvsc", 9));
    fakeStudents.add(new Student("regwfdvas", 10));
    fakeStudents.add(new Student("j3yhrtwgerq", 11));
    fakeStudents.add(new Student("3untyrbt", 12));
    fakeStudents.add(new Student("n3yrbt", 13));
    fakeStudents.add(new Student("umtnhyrwbg", 14));
    fakeStudents.add(new Student("utnyhbrg", 15));
    fakeStudents.add(new Student("aum4tn3ywr", 16));
    fakeStudents.add(new Student("ym4tn", 17));
    fakeStudents.add(new Student("a4yjmtnhe", 18));
    fakeStudents.add(new Student("asddff", 19));
    fakeStudents.add(new Student("asszdf", 20));
    fakeStudents.add(new Student("asd", 21));
    fakeStudents.add(new Student("asdcwert", 22));
    fakeStudents.add(new Student("arqwersd", 23));
    fakeStudents.add(new Student("aswecrtd", 24));
    fakeStudents.add(new Student("acfqwsd", 25));
    fakeStudents.add(new Student("ascfqgxd", 26));
    fakeStudents.add(new Student("asub3j57d", 27));
    fakeStudents.add(new Student("asqvd", 28));
    fakeStudents.add(new Student("aswed", 29));
    fakeStudents.add(new Student("asdqecr", 30));
    fakeStudents.add(new Student("awusd", 31));
    fakeStudents.add(new Student("as13vy5d", 32));
    fakeStudents.add(new Student("as135yd", 33));

    ArrayList<Integer> randomVals = new ArrayList<Integer>();
    int x;
    int maxstudentAdditions;
    for (Course c : cat.getCourseList()) {
      maxstudentAdditions = (int) Math.floor(Math.random() * (fakeStudents.size() - 1)) + 1;
      for (int i = 0; i <= maxstudentAdditions; i++) {
        x = (int) Math.floor(Math.random() * (fakeStudents.size()));
        while (randomVals.contains(x) == true) {
          x = (int) Math.floor(Math.random() * (fakeStudents.size()));
        }
        randomVals.add(x);
        fakeStudents.get(x).registerForCourse(cat, c.getCourseName(), c.getCourseId(),
            ((int) Math.floor(Math.random() * (3)) + 1));
        if (i == maxstudentAdditions)
          randomVals.clear();
      }
    }
    System.out
        .println("\n*************************** Object Instantiation Scripts ***********************************\n");
  }

  public static void main(String[] args) throws InterruptedException {
    CourseCat cat = new CourseCat(DataLoader.loadCoursesFromDataBase());
    ObjectInitilizer(cat);
    Student s = new Student("temp", 1000);

    selectView sv = new selectView();
    selectController sc = new selectController(sv, cat);

    addView av = new addView();
    addController ac = new addController(av, cat, s);

    studentView studentV = new studentView();
    studentController studentC = new studentController(studentV, s);

    removeView rv = new removeView();
    removeController rc = new removeController(rv, cat, s);

    coursesView cv = new coursesView();
    coursesController cc = new coursesController(cv, cat);

    menuView menu = new menuView();
    menuController controller = new menuController(menu, s, av, studentV, sv, rv, cv);
    menu.setVisible(true);
  }
}