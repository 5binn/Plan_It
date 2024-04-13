package com.example.PlanIt.domain.user.controller;

import com.example.PlanIt.domain.user.dto.UserDto;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.entity.UserForm;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.request.Rq;
import com.example.PlanIt.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class ApiV1UserController {
    private final UserService userService;
    private final Rq rq;

    @GetMapping("")
    public RsData<List<SiteUser>> getUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/{id}")
    public RsData<SiteUser> getUser(@PathVariable("id") Long id) {
        return this.userService.getUserById(id);
    }

    @PostMapping("")
    public RsData<SiteUser> signIn(@Valid @RequestBody UserForm userForm) {
        return userService.create(userForm.getUsername(), userForm.getPassword1(), userForm.getNickname(), userForm.getEmail());
    }

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private UserDto userDto;
    }

    @PostMapping("/login")
    public RsData<LoginResponseBody> login (@Valid @RequestBody LoginRequestBody loginRequestBody) {

        RsData<UserService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = userService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        // 쿠키에 accessToken, refreshToken 토큰 넣기
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(authAndMakeTokensRs.getResultCode(),authAndMakeTokensRs.getMessage(), new LoginResponseBody(new UserDto(authAndMakeTokensRs.getData().getSiteUser())));
    }

    @PostMapping("/logout")
    public RsData<Void> logout() {
        rq.removeCrossDomainCookie("accessToken");
        rq.removeCrossDomainCookie("refreshToken");

        return RsData.of("200", "로그아웃 성공");
    }
}
