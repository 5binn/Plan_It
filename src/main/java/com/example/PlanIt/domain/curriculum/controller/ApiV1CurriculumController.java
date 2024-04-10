package com.example.PlanIt.domain.curriculum.controller;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.entity.CurriculumForm;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Util;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/curriculums")
@RequiredArgsConstructor
public class ApiV1CurriculumController {
    private final CurriculumService curriculumService;
    private final UserService userService;

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
        SiteUser host = userService.getUserById(1L).getData(); //임시

        return this.curriculumService.create(curriculumForm.getName(), host, Util.toDate(curriculumForm.getStartDate()), Util.toDate(curriculumForm.getEndDate()));
    }

    @DeleteMapping("/{id}")
    public RsData<Curriculum> delete(@PathVariable("id") Long id) {
        return this.curriculumService.delete(id);
    }

    @PatchMapping("/{id}")
    public RsData<Curriculum> update(@PathVariable("id") Long id, @Valid @RequestBody CurriculumForm curriculumForm) {
        return this.curriculumService.update(id,curriculumForm.getName(), Util.toDate(curriculumForm.getStartDate()), Util.toDate(curriculumForm.getEndDate()));
    }
}
