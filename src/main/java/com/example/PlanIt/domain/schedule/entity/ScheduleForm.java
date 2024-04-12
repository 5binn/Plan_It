package com.example.PlanIt.domain.schedule.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleForm {
    @NotBlank(message = "내용을 입력하세요.")
    private String content;
    @NotBlank(message = "날짜를 선택하세요.")
    private String date;
}
