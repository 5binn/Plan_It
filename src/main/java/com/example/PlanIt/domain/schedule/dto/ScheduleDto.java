package com.example.PlanIt.domain.schedule.dto;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.user.dto.UserDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ScheduleDto {
    private Long id;
    private CurriculumDto curriculum;
    private String content;
    private LocalDate date;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public ScheduleDto(Curriculum curriculum, Schedule schedule) {
        this.id = schedule.getId();
        this.curriculum = new CurriculumDto(curriculum);
        this.content =  schedule.getContent();
        this.date = schedule.getDate();
        this.createdDate = schedule.getCreatedDate();
        this.modifiedDate = schedule.getModifiedDate();
    }
}
