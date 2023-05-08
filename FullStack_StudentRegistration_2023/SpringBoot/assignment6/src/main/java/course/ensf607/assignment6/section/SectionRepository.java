package course.ensf607.assignment6.section;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import course.ensf607.assignment6.course.Course;
import net.bytebuddy.asm.Advice.OffsetMapping.Sort;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {

    // Optional<Section> findByName(String name);

    // List<Section> findByCourse(Course Course, Sort sort);

    // @Query("Select s from Section s WHERE s.SectionNum = ?1")
    // Optional<Section> getSectionBySectionNum(String SectionNum);
}
