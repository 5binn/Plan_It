package com.example.PlanIt.domain.user.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserForm{
    @NotBlank(message = "ID를 입력하세요.")
    private String username;
    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password1;
    @NotBlank(message = "비밀번호 확인을 입력하세요.")
    private String password2;
    @NotBlank(message = "닉네임을 입력하세요.")
    private String nickname;
    @NotBlank(message = "이메일을 입력하세요.")
    private String email;
}