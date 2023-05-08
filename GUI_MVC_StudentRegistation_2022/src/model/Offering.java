package model;

import java.util.ArrayList;

public class Offering {

    private int section;
    private Course theCourse;

    private ArrayList<Registration> studentList;

    public ArrayList<Registration> getStudentList() {
        return studentList;
    }

    public void addStudent(Registration r) {
        studentList.add(r);
    }

    public Offering(int section) {

        this.section = section;
        studentList = new ArrayList<>();
    }

    public int getSection() {
        return section;
    }

    public void setSection(int section) {
        this.section = section;
    }

    public void setTheCourse(Course theCourse) {
        this.theCourse = theCourse;
    }

    public boolean isRunning() {
        if (this.studentList.size() >= 8)
            return true;
        return false;
    }

    public Course getTheCourse() {
        return theCourse;
    }

    public String getTheCourseName() {
        return theCourse.getCourseName();
    }

    public int getTheCourseId() {
        return theCourse.getCourseId();
    }

    public void removeStudent(Registration r) {
        studentList.remove(r);
    }

    @Override
    public String toString() {
        return "\n\t\t\tOffering{" +
                "section=" + section +
                ", Enrollments: " + studentList.size() +
                ", Currently Running: " + isRunning() +
                '}';
    }
}
