package com.example.PlanIt.domain.curriculum.dto;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.user.dto.UserDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CurriculumDto {
    private Long id;
    private String name;
    private UserDto host;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public CurriculumDto(Curriculum curriculum) {
        this.id = curriculum.getId();
        this.name = curriculum.getName();
        this.host = new UserDto(curriculum.getHost());
        this.startDate = curriculum.getStartDate();
        this.endDate = curriculum.getEndDate();
        this.createdDate = curriculum.getCreatedDate();
        this.modifiedDate = curriculum.getModifiedDate();
    }
}
