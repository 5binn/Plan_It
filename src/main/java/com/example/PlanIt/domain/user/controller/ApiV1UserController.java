package com.example.PlanIt.domain.user.controller;

import com.example.PlanIt.domain.user.dto.UserDto;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.entity.UserForm;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.mail.dto.MailDto;
import com.example.PlanIt.global.mail.service.MailService;
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
    private final MailService mailService;

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

    @PatchMapping("/update")
    public RsData<SiteUser> update(@Valid @RequestBody UserForm userForm) {
        SiteUser user = rq.getMember();
        return userService.update(user, userForm.getNickname(), userForm.getEmail(), userForm.getPassword1());
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

    @PostMapping("/find/id")
    public boolean findId(@RequestParam(value = "email", defaultValue = "") String email) {
        RsData<SiteUser> rsData = userService.getUserByEmail(email);
        MailDto mailDto = new MailDto();
        mailDto.setTo(email);
        mailDto.setTitle("[PlanI]t ID 찾기 결과입니다.");
        mailDto.setContent("해당 ID는 [ %s ] 입니다.".formatted(rsData.getData().getUsername()));
        mailService.sendMail(mailDto);
        return true;
    }

    @PostMapping("/find/pw")
    public boolean findPw(@RequestParam(value = "email", defaultValue = "") String email) {
        String newPw = userService.generatePw();
        RsData<SiteUser> rsData = userService.updatePw(email, newPw);
        MailDto mailDto = new MailDto();
        mailDto.setTo(email);
        mailDto.setTitle("[PlanIt] 비밀번호 찾기 결과입니다.");
        mailDto.setContent("[%s]님의 새로운 비밀번호는 [ %s ] 입니다.".formatted(rsData.getData().getUsername(), newPw));
        mailService.sendMail(mailDto);
        return true;
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
        System.out.println(loginRequestBody.getPassword());
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
