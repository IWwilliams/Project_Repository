package model;

import java.util.ArrayList;

public class Course {

    private String courseName;
    private int courseId;
    private ArrayList<Course> preReqs;
    private ArrayList<Offering> offeringList;

    public Course(String courseName, int courseId) {
        this.courseName = courseName;
        this.courseId = courseId;
        this.offeringList = new ArrayList<Offering>();
        this.preReqs = new ArrayList<Course>();
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setPreReqs(ArrayList<Course> preReqs) {
        // this.preReqs = preReqs;
        for (Course c : preReqs)
            this.preReqs.add(c);
    }

    public Offering getOffering(int i) {
        return offeringList.get(i - 1);
    }

    public void setOfferingList(ArrayList<Offering> offeringList) {
        for (Offering offering : offeringList) {
            offering.setTheCourse(this);
            this.offeringList.add(offering);
        }
    }

    public ArrayList<Offering> getOfferingList() {
        return (ArrayList<Offering>) this.offeringList.clone();
    }

    public String getCourseNameId() {
        return getCourseName() + " " + getCourseId();
    }

    @Override
    public String toString() {
        String prereqCourseNameId = null;
        if (preReqs.size() > 0) {
            prereqCourseNameId = preReqs.get(0).getCourseNameId();
        }

        return "Course{\n" +
                "\tcourseName='" + courseName + '\'' +
                "\n\t, courseId=" + courseId +
                "\n\t, preReqs=" + prereqCourseNameId +
                "\n\t, offeringList=" + offeringList +
                '}' + "\n";
    }
}
