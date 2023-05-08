package course.ensf607.assignment6.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("Select s from Student s WHERE s.ucid = ?1")
    Optional<Student> findStudentByUcid(String ucid);

}
