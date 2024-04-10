package com.example.PlanIt.domain.curriculum.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CurriculumForm {
    @NotBlank(message = "제목을 입력하세요.")
    private String name;
    @NotBlank(message = "시작 날짜를 선택하세요.")
    private String startDate;
    @NotBlank(message = "종료 날짜를 선택하세요.")
    private String endDate;
}
