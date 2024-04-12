package com.example.PlanIt.domain.comment.dto;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.schedule.dto.ScheduleDto;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.user.dto.UserDto;
import com.example.PlanIt.domain.user.entity.SiteUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private ScheduleDto schedule;
    private UserDto author;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public CommentDto(Schedule schedule, SiteUser author, Comment comment) {
        this.id = comment.getId();
        this.schedule = new ScheduleDto(schedule.getCurriculum(), schedule);
        this.author = new UserDto(author);
        this.content =  comment.getContent();
        this.createdDate = comment.getCreatedDate();
        this.modifiedDate = comment.getModifiedDate();
    }
}
