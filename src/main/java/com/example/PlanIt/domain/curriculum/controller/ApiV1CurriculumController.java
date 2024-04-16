package com.example.PlanIt.domain.curriculum.controller;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.entity.CurriculumForm;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.guest.service.GuestService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.request.Rq;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Response;
import com.example.PlanIt.global.util.Util;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/curriculums")
@RequiredArgsConstructor
public class ApiV1CurriculumController {
    private final CurriculumService curriculumService;
    private final GuestService guestService;
    private final Rq rq;


    @GetMapping("")
    public RsData<Response.getCurriculums> getCurriculums() {
        RsData<List<Curriculum>> rsData = this.curriculumService.getCurriculums();
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();
        for (Curriculum c : rsData.getData()) {
            curriculumDtoList.add(new CurriculumDto(c));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculums(curriculumDtoList)
        );
    }

    @GetMapping("/user")
    public RsData<Response.getCurriculums> getCurriculumsByUsername() {
        RsData<List<Curriculum>> rsData = this.curriculumService.getCurriculumsByUsername(rq.getMember().getUsername());
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();
        for (Curriculum c : rsData.getData()) {
            curriculumDtoList.add(new CurriculumDto(c));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculums(curriculumDtoList)
        );
    }

    @GetMapping("/host")
    public RsData<Response.getCurriculums> getCurriculumsByHost() {
        RsData<List<Curriculum>> rsData = this.curriculumService.getCurriculumsByHost(rq.getMember().getUsername());
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();
        for (Curriculum c : rsData.getData()) {
            curriculumDtoList.add(new CurriculumDto(c));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculums(curriculumDtoList)
        );
    }
    @GetMapping("/guest")
    public RsData<Response.getCurriculums> getCurriculumsByGuest() {
        RsData<List<Curriculum>> rsData = this.curriculumService.getCurriculumsByGuestApproved(rq.getMember().getUsername());
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();
        for (Curriculum c : rsData.getData()) {
            curriculumDtoList.add(new CurriculumDto(c));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculums(curriculumDtoList)
        );
    }

    @GetMapping("/wait")
    public RsData<Response.getCurriculums> getCurriculumsByGuestWait() {
        RsData<List<Curriculum>> rsData = this.curriculumService.getCurriculumsByGuestWait(rq.getMember().getUsername());
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();
        for (Curriculum c : rsData.getData()) {
            curriculumDtoList.add(new CurriculumDto(c));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculums(curriculumDtoList)
        );
    }


    @GetMapping("/{id}")
    public RsData<Response.getCurriculum> getCurriculum(@PathVariable("id") Long id) {
        RsData<Curriculum> rsData = this.curriculumService.getCurriculumById(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getCurriculum(new CurriculumDto(rsData.getData()))
        );
    }

    @PostMapping("")
    public RsData<Response.createCurriculum> createCurriculum (@Valid @RequestBody CurriculumForm curriculumForm) {
        SiteUser host = rq.getMember();
        RsData<Curriculum> rsData = this.curriculumService.create(
                curriculumForm.getName(), host, Util.toDate(curriculumForm.getStartDate()), Util.toDate(curriculumForm.getEndDate()));
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        guestService.own(rsData.getData(), rq.getMember());
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.createCurriculum(new CurriculumDto(rsData.getData()))
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Response.deleteCurriculum> deleteCurriculum(@PathVariable("id") Long id) {
        RsData<Curriculum> rsData = this.curriculumService.delete(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage()
        );
    }

    @PatchMapping("/{id}")
    public RsData<Response.updateCurriculum> updateCurriculum(@PathVariable("id") Long id, @Valid @RequestBody CurriculumForm curriculumForm) {
        RsData<Curriculum> rsData = this.curriculumService.update(id, curriculumForm.getName(), Util.toDate(curriculumForm.getStartDate()), Util.toDate(curriculumForm.getEndDate()));
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.updateCurriculum(new CurriculumDto(rsData.getData()))
        );
    }
}
