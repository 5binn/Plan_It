package com.example.PlanIt.domain.user.controller;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.user.dto.UserDto;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.entity.UserForm;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.request.Rq;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Response;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class ApiV1UserController {
    private final UserService userService;
    private final Rq rq;

    @GetMapping("")
    public RsData<Response.getUsers> getUsers(@RequestParam(value = "kw", defaultValue = "") String kw) {
        RsData<List<SiteUser>> rsData = this.userService.searchUsers(kw);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        List<UserDto> userDtoList = new ArrayList<>();
        for (SiteUser u : rsData.getData()) {
            userDtoList.add(new UserDto(u));
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getUsers(userDtoList)
        );
    }

    @GetMapping("/{id}")
    public RsData<SiteUser> getUser(@PathVariable("id") Long id) {
        return this.userService.getUserById(id);
    }

    @PostMapping("")
    public RsData<SiteUser> signUp(@Valid @RequestBody UserForm userForm) {
        return userService.create(userForm.getUsername(), userForm.getPassword1(), userForm.getNickname(), userForm.getEmail());
    }

    @PostMapping("/username")
    public boolean checkId(@RequestParam(value = "id", defaultValue = "") String username) {
        return userService.verificationUsername(username);
    }

    @PostMapping("/nickname")
    public boolean checkNickname(@RequestParam(value = "nickname", defaultValue = "") String nickname) {
        return userService.verificationNickname(nickname);
    }

    @PostMapping("/email")
    public boolean checkEmail(@RequestParam(value = "email", defaultValue = "") String email) {
        return userService.verificationEmail(email);
    }


    @Getter
    @AllArgsConstructor
    public static class MeResponseBody {
        private final UserDto userDto;
    }

    @GetMapping("/me")
    public RsData<MeResponseBody> me() {
        SiteUser siteUser = rq.getMember();

        return RsData.of(
                "200",
                "내 정보 조회 성공",
                new MeResponseBody(new UserDto(siteUser))
        );
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
    public RsData<LoginResponseBody> login(@Valid @RequestBody LoginRequestBody loginRequestBody) {

        RsData<UserService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = userService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        // 쿠키에 accessToken, refreshToken 토큰 넣기
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(authAndMakeTokensRs.getResultCode(), authAndMakeTokensRs.getMessage(), new LoginResponseBody(new UserDto(authAndMakeTokensRs.getData().getSiteUser())));
    }

    @PostMapping("/logout")
    public RsData<Void> logout() {
        rq.removeCrossDomainCookie("accessToken");
        rq.removeCrossDomainCookie("refreshToken");

        return RsData.of("200", "로그아웃 성공");
    }
}
