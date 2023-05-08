package course.ensf607.assignment6.section;

import com.fasterxml.jackson.annotation.JsonIgnore;
import course.ensf607.assignment6.course.Course;
import course.ensf607.assignment6.student.Student;

import javax.persistence.*;

import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.OnDelete;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "section")
public class Section implements Serializable {

    @Id
    @SequenceGenerator(name = "section_sequence", sequenceName = "section_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "section_sequence")
    private long id;

    private String SectionNum;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "student_enrolled", joinColumns = @JoinColumn(name = "section_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
    private Set<Student> enrolledStudents = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "enrolledSections")
    private Set<Course> course = new HashSet<>();

    public Section() {
    }

    public Section(Long id, String sectionNum, Set<Course> Course, Set<Student> enrolledStudents) {
        this.id = id;
        this.SectionNum = sectionNum;
        this.course = Course;
        this.enrolledStudents = enrolledStudents;
    }

    public Section(String sectionNum, Set<Course> Course, Set<Student> enrolledStudents) {
        this.SectionNum = sectionNum;
        this.course = Course;
        this.enrolledStudents = enrolledStudents;
    }

    public Long getId() {
        return id;
    }

    public Section setId(Long id) {
        this.id = id;
        return this;
    }

    public Set<Course> getCourse() {
        return course;
    }

    public Section setCourse(Set<Course> Course) {
        this.course = Course;
        return this;
    }

    public String getSectionNum() {
        return this.SectionNum;
    }

    public Section setSectionNum(String SectionNum) {
        this.SectionNum = SectionNum;
        return this;
    }

    public Set<Student> getEnrolledStudents() {
        return enrolledStudents;
    }

    public Section setEnrolledStudents(Set<Student> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
        return this;
    }

    public void enrolledStudents(Student student) {
        enrolledStudents.add(student);
    }

    public void deenrolStudents(Student student) {
        enrolledStudents.remove(student);
    }
}