package com.example.PlanIt.domain.schedule.service;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.schedule.repository.ScheduleRepository;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public RsData<List<Schedule>> getSchedules() {
        return scheduleRepository.findAll().isEmpty() ?
                RsData.of(
                        "F-1",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1",
                        "성공",
                        scheduleRepository.findAll()
                );
    }

    public RsData<List<Schedule>> getSchedulesByCurriculumId(Long curriculumId) {
        return scheduleRepository.findSchedulesByCurriculumId(curriculumId).isEmpty() ?
                RsData.of(
                        "F-1C",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1C",
                        "성공",
                        scheduleRepository.findSchedulesByCurriculumId(curriculumId)
                );
    }

    public RsData<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id).map((curriculum) -> RsData.of(
                "S-2",
                "성공",
                curriculum
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 데이터 없음".formatted(id)
        ));
    }

    @Transactional
    public RsData<Schedule> create(Curriculum curriculum, String content, LocalDate date) {
        try {
            Schedule schedule = Schedule.builder()
                    .curriculum(curriculum)
                    .content(content)
                    .date(date)
                    .build();
            scheduleRepository.save(schedule);
            return RsData.of(
                    "S-3",
                    "등록 완료",
                    schedule
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-3",
                    "등록 실패"
            );
        }
    }
    @Transactional
    public RsData<Schedule> delete(Long id) {
        RsData<Schedule> scheduleRsData = this.getScheduleById(id);
        if (scheduleRsData.isFail()) {
            return scheduleRsData;
        }
        try {
            this.scheduleRepository.delete(scheduleRsData.getData());
            return RsData.of(
                    "S-4",
                    "%d 번 삭제 완료".formatted(id)
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-4",
                    "삭제 실패"
            );
        }
    }
    @Transactional
    public RsData<Schedule> update(Long id, String content, LocalDate date) {
        RsData<Schedule> scheduleRsData = this.getScheduleById(id);
        if (scheduleRsData.isFail()) {
            return scheduleRsData;
        }
        try {
            Schedule updateSchedule = scheduleRsData.getData().toBuilder()
                    .content(content)
                    .date(date)
                    .build();
            this.scheduleRepository.save(updateSchedule);
            return RsData.of(
                    "S-5",
                    "%d번 수정 완료".formatted(id),
                    updateSchedule);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "수정 실패",
                    null
            );
        }
    }
}
