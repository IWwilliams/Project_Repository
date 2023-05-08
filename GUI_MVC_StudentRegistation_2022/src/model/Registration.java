package model;

public class Registration {

    private Offering theOffering;
    private Student theStudent;
    private char theGrade;

    public Student getTheStudent() {
        return theStudent;
    }

    public void register(Student theStudent, Offering theOffering) {
        this.theStudent = theStudent;
        this.theOffering = theOffering;
        theOffering.addStudent(this);
        theStudent.addCourse(this);
    }

    public void setTheGrade(char theGrade) {
        this.theGrade = theGrade;
    }

    public char getTheGrade() {
        return theGrade;
    }

    public Offering getTheOffering() {
        return theOffering;
    }

    public void setTheOffering(Offering theOffering) {
        this.theOffering = theOffering;
    }

    public Offering search(String courseName, int courseId) {
        Course course = this.theOffering.getTheCourse();
        if ((course.getCourseName() == courseName) & (course.getCourseId() == courseId)) {
            return this.theOffering;
        }
        return null;
    }

    public String getCourseName() {
        return theOffering.getTheCourseName();
    }

    public int getCourseId() {
        return theOffering.getTheCourseId();
    }

    @Override
    public String toString() {
        return "\n\t\tRegistration{" +
                "\n\t\t\tCourse=" + getCourseName() +
                "\n\t\t\tId=" + getCourseId() +
                "\n\t\t\tOffering=" + theOffering +
                "\n\t\t\ttheGrade=" + theGrade +
                '}';
    }
}
