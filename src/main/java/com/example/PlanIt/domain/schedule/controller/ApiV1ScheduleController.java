package com.example.PlanIt.domain.schedule.controller;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.entity.CurriculumForm;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.guest.dto.GuestDto;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.schedule.dto.ScheduleDto;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.schedule.entity.ScheduleForm;
import com.example.PlanIt.domain.schedule.service.ScheduleService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Response;
import com.example.PlanIt.global.util.Util;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/schedules")
@RequiredArgsConstructor
public class ApiV1ScheduleController {
    private final ScheduleService scheduleService;
    private final CurriculumService curriculumService;

    @GetMapping("")
    public RsData<Response.getSchedules> getSchedules() {
        RsData<List<Schedule>> rsData = this.scheduleService.getSchedules();
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (Schedule s : rsData.getData()) {
            scheduleDtoList.add(new ScheduleDto(s.getCurriculum(), s));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getSchedules(scheduleDtoList)
        );
    }
    @GetMapping("/curriculum/{id}") //커리큘럼 ID
    public RsData<Response.getSchedules> getGuestsByCurriculumId(@PathVariable("id") Long id) {
        RsData<List<Schedule>> rsData = this.scheduleService.getSchedulesByCurriculumId(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getSchedules(this.toDtoList(rsData.getData()))
        );
    }

    @GetMapping("/{id}")
    public RsData<Response.getSchedule> getSchedule(@PathVariable("id") Long id) {
        RsData<Schedule> rsData = this.scheduleService.getScheduleById(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getSchedule(new ScheduleDto(rsData.getData().getCurriculum(), rsData.getData()))
        );
    }

    @PostMapping("/{id}") //커리큘럼 ID
    public RsData<Response.createSchedule> createCurriculum(@PathVariable("id") Long id, @Valid @RequestBody ScheduleForm scheduleForm) {
        RsData<Curriculum> curriculumRsData = curriculumService.getCurriculumById(id);
        if (curriculumRsData.isFail()) {
            return (RsData) curriculumRsData;
        }
        RsData<Schedule> scheduleRsData = scheduleService.create(
                curriculumRsData.getData(), scheduleForm.getContent(), Util.toDate(scheduleForm.getDate()));
        if (scheduleRsData.isFail()) {
            return (RsData) scheduleRsData;
        }
        return RsData.of(
                scheduleRsData.getResultCode(),
                scheduleRsData.getMessage(),
                new Response.createSchedule(new ScheduleDto(scheduleRsData.getData().getCurriculum(), scheduleRsData.getData()))
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Response.deleteSchedule> deleteSchedule(@PathVariable("id") Long id) {
        RsData<Schedule> rsData = this.scheduleService.delete(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage()
        );
    }

    @PatchMapping("/{id}")
    public RsData<Response.updateSchedule> updateSchedule(@PathVariable("id") Long id, @Valid @RequestBody ScheduleForm scheduleForm) {
        RsData<Schedule> rsData = this.scheduleService.update(id, scheduleForm.getContent(), Util.toDate(scheduleForm.getDate()));
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.updateSchedule(new ScheduleDto(rsData.getData().getCurriculum(), rsData.getData()))
        );
    }

    public List<ScheduleDto> toDtoList(List<Schedule> schedules) {
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (Schedule s : schedules) {
            scheduleDtoList.add(new ScheduleDto(s.getCurriculum(), s));
        }
        return scheduleDtoList;
    }
}
