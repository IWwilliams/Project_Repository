package model;

import java.util.ArrayList;

public class Student {

    private String name;
    private int id;

    private ArrayList<Registration> courseList;

    public ArrayList<Registration> getCourseList() {
        return courseList;
    }

    public Student(String name, int id) {
        this.name = name;
        this.id = id;
        courseList = new ArrayList<>();
    }

    public void addCourse(Registration r) {
        courseList.add(r);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void removeCourse(Registration r) {
        courseList.remove(r);
    }

    public boolean courseListSize() {
        if (this.courseList.size() > 5)
            return true;
        return false;
    }

    public int registerForCourse(CourseCat cat, String courseName, int courseId, int secNumber) {
        Course myCourse = cat.searchCat(courseName, courseId);
        if (myCourse == null)
            return 0;
        if (courseListSize())
            return 2;
        Offering theOffering = myCourse.getOffering(secNumber);
        for (Registration r : theOffering.getStudentList()) {
            if (r.getTheStudent().equals(this))
                return 1;
        }
        Registration reg = new Registration();
        reg.register(this, theOffering);
        return -1;
    }

    public int deregisterForCourse(CourseCat cat, String courseName, int courseId, int secNumber) {
        Course myCourse = cat.searchCat(courseName, courseId);
        if (myCourse == null)
            return 0;
        Offering theOffering = myCourse.getOffering(secNumber);
        boolean test = false;
        for (Registration r : theOffering.getStudentList()) {
            if (r.getTheStudent().equals(this))
                test = true;
        }
        if (test != true)
            return -1;
        for (Registration r : courseList) {
            if (r.getTheOffering() == theOffering) {
                theOffering.removeStudent(r);
                removeCourse(r);
                break;
            }
        }
        return 1;
    }

    @Override
    public String toString() {
        return "Student{" +
                "\n\tname='" + name + '\'' +
                "\n\t, id=" + id +
                "\n\t, courseList=" + courseList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        Student other = (Student) o;
        if (other.getName().equals(this.getName()))
            return true;
        return false;
    }
}
