package course.ensf607.assignment6.course;

import course.ensf607.assignment6.section.Section;
import course.ensf607.assignment6.section.SectionService;
import course.ensf607.assignment6.student.Student;
import course.ensf607.assignment6.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "api/v1/course")
public class CourseController {

    private final CourseService courseService;

    private final SectionService sectionService;

    @Autowired
    public CourseController(CourseService courseService, SectionService sectionService) {
        this.courseService = courseService;
        this.sectionService = sectionService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("sections/{courseName}")
    public List<String> getAllSections(@PathVariable String courseName) {
        Course course = courseService.getCourseByName(courseName);
        Set<Section> sectionList = course.getEnrolledSections();
        List<String> courseSections = new ArrayList<String>();
        for (Section s : sectionList) {
            courseSections.add(s.getSectionNum());
        }
        Collections.sort(courseSections);
        return courseSections;
    }

    @PostMapping
    public void registerNewCourse(@RequestBody Course course) {
        courseService.addNewCourse(course);
    }

    @PutMapping("{courseName}/section")
    public Course enrollSectionToCourse(@PathVariable String courseName) {
        Course course = courseService.getCourseByName(courseName);
        String sectionIndex = Integer.toString(course.getEnrolledSections().size() + 1);
        Section section = new Section(sectionIndex, null, null);
        sectionService.addNewSection(section);
        course.enrolledSections(section);
        courseService.updateCourse(course);
        return course;
    }

    @PutMapping("/updateCourse/OldName/{oldName}/NewName/{newName}")
    public Course updateCourseName(@PathVariable String oldName, @PathVariable String newName) {
        Course course = courseService.getCourseByName(oldName);
        courseService.updateCourse(course.setName(newName));
        return course;
    }

    @DeleteMapping("{courseName}/section/{sectionNum}")
    public Course deenrolSectionfromCourse(@PathVariable String courseName,
            @PathVariable String sectionNum) {
        Course course = courseService.getCourseByName(courseName);
        for (Section s : course.getEnrolledSections()) {
            if (s.getSectionNum().equals(sectionNum)) {
                course.deenrolSection(s);
                courseService.updateCourse(course);
                return course;
            }
        }
        return null;
    }
}
