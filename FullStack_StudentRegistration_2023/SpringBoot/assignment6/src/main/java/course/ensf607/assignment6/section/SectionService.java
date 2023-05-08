package course.ensf607.assignment6.section;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public List<Section> getAllSection() {
        return sectionRepository.findAll();
    }

    public void addNewSection(Section section) {
        sectionRepository.save(section);
    }

    public void updateSection(Section section) {
        sectionRepository.save(section);
    }

    public Section getSectionById(Long sectionId) {
        Optional<Section> sectionById = sectionRepository.findById(sectionId);
        if (!sectionById.isPresent()) {
            throw new IllegalStateException("Course does'nt exist!");
        }
        return sectionById.get();
    }

    // public Section getSectionBySectionNum(String SectionNum) {
    // Optional<Section> sectionBySectionNum =
    // sectionRepository.getSectionBySectionNum(SectionNum);
    // if (!sectionBySectionNum.isPresent()) {
    // throw new IllegalStateException("student does'nt exist!");
    // }
    // return sectionBySectionNum.get();
    // }
}
