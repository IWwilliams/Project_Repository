package course.ensf607.assignment6.section;

import course.ensf607.assignment6.course.Course;
import course.ensf607.assignment6.course.CourseService;
import course.ensf607.assignment6.student.Student;
import course.ensf607.assignment6.student.StudentService;
import net.bytebuddy.implementation.bytecode.Throw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/section")
public class SectionController {

    private final SectionService sectionService;

    private final StudentService studentService;

    private final CourseService courseService;

    @Autowired
    public SectionController(SectionService sectionService, StudentService studentService,
            CourseService courseService) {
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.courseService = courseService;
    }

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSection();
    }

    @PostMapping()
    public void registerNewSection(@RequestBody Section section, @PathVariable String courseName) {
        sectionService.addNewSection(section);
    }

    @PutMapping("{sectionNum}/course/{courseName}/students/{studentId}")
    public Section enrollStudentToSection(@PathVariable String sectionNum,
            @PathVariable String courseName,
            @PathVariable String studentId) {

        Course course = courseService.getCourseByName(courseName);
        Student student = studentService.getStudentByUCID(studentId);

        for (Section s : course.getEnrolledSections()) {
            if (s.getSectionNum().equals(sectionNum)) {
                if (!s.getEnrolledStudents().contains(student)) {
                    s.enrolledStudents(student);
                    sectionService.updateSection(s);
                    return s;
                } else {
                    throw new IllegalStateException("Duplicate enrollment error!");
                }
            }
        }
        return null;
    }

    @DeleteMapping("{sectionNum}/course/{courseName}/students/{studentId}")
    public Section deenrolStudentsfromCourse(@PathVariable String sectionNum,
            @PathVariable String courseName,
            @PathVariable String studentId) {
        Course course = courseService.getCourseByName(courseName);
        Student student = studentService.getStudentByUCID(studentId);

        for (Section s : course.getEnrolledSections()) {
            if (s.getSectionNum().equals(sectionNum)) {
                s.deenrolStudents(student);
                sectionService.updateSection(s);
                return s;
            }
        }
        throw new IllegalStateException("De-enrollment didn't work!");
    }
}
