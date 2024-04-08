package com.example.PlanIt.domain.curriculum.controller;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.entity.CurriculumForm;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/curriculums")
@RequiredArgsConstructor
public class ApiV1CurriculumController {
    private final CurriculumService curriculumService;

    @GetMapping("")
    public RsData<List<Curriculum>> getCurriculums() {
        return this.curriculumService.getCurriculums();
    }

    @GetMapping("/{id}")
    public RsData<Curriculum> getCurriculum(@PathVariable("id") Long id) {
        return this.curriculumService.getCurriculumById(id);
    }

    @PostMapping("")
    public RsData<Curriculum> create(@Valid @RequestBody CurriculumForm curriculumForm) {
        return this.curriculumService.create(curriculumForm.getName(), new SiteUser(), curriculumForm.getStartDate(), curriculumForm.getEndDate());
    }

    @DeleteMapping("/{id}")
    public RsData<Curriculum> delete(@PathVariable("id") Long id) {
        return this.curriculumService.delete(id);
    }

    @PatchMapping("/{id}")
    public RsData<Curriculum> update(@PathVariable("id") Long id, @Valid @RequestBody CurriculumForm curriculumForm) {
        return this.curriculumService.update(id,curriculumForm.getName(), curriculumForm.getStartDate(), curriculumForm.getEndDate());
    }
}
