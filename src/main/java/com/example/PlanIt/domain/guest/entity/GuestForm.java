package com.example.PlanIt.domain.guest.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuestForm {
    @NotNull(message = "초대할 대상을 선택하세요.")
    private Long userId;
}
