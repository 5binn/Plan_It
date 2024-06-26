package com.example.PlanIt.domain.user.service;

import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.repository.UserRepository;
import com.example.PlanIt.global.jwt.JwtProvider;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.security.SecurityUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${custom.randomPW}")
    private String characters;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public RsData<List<SiteUser>> searchUsers(String keyword) {
        return userRepository.findByKeyword(keyword).isEmpty() ?
                RsData.of(
                        "F-1",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1",
                        "성공",
                        userRepository.findByKeyword(keyword)
                );
    }

    public RsData<SiteUser> getUserById(Long id) {
        return userRepository.findById(id).map((siteUser) -> RsData.of(
                "S-2",
                "성공",
                siteUser
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 회원 없음".formatted(id)
        ));
    }

    public RsData<SiteUser> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map((siteUser) -> RsData.of(
                "S-2",
                "성공",
                siteUser
        )).orElseGet(() -> RsData.of(
                "F-2",
                "해당 회원 없음"
        ));
    }


    public boolean verificationUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean verificationNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public boolean verificationEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public RsData<SiteUser> create(String username, String password, String nickname, String email) {
        try {
            SiteUser siteUser = SiteUser.builder()
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .nickname(nickname)
                    .email(email)
                    .build();
            String refreshToken = jwtProvider.genRefreshToken(siteUser);
            siteUser.setRefreshToken(refreshToken);
            userRepository.save(siteUser);
            return RsData.of(
                    "S-3",
                    "가입 완료",
                    siteUser
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-3",
                    "가입 실패"
            );
        }
    }

    public boolean validateToken(String token) {
        return jwtProvider.verify(token);
    }

    public RsData<String> refreshAccessToken(String refreshToken) {
        SiteUser siteUser = userRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new RuntimeException("존재하지 않는 리프레시 토큰입니다."));

        String accessToken = jwtProvider.genAccessToken(siteUser);

        return RsData.of("200-1", "토큰 갱신 성공", accessToken);
    }

    public SecurityUser getUserFromAccessToken(String accessToken) {
        Map<String, Object> payloadBody = jwtProvider.getClaims(accessToken);

        long id = (int) payloadBody.get("id");
        String username = (String) payloadBody.get("username");
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new SecurityUser(id, username, "", authorities);
    }

    @AllArgsConstructor
    @Getter
    public static class AuthAndMakeTokensResponseBody {
        private SiteUser siteUser;
        private String accessToken;
        private String refreshToken;
    }

    @Transactional
    public RsData<AuthAndMakeTokensResponseBody> authAndMakeTokens(String username, String password) {
        SiteUser siteUser = this.userRepository.findByUsername(username)
                .filter(user -> {
                    if (!passwordEncoder.matches(password, user.getPassword())) {
                        throw new RuntimeException("비밀번호가 일치하지 않습니다.");
                    }
                    return true;
                })
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        // AccessToken 생성
        String accessToken = jwtProvider.genAccessToken(siteUser);
        // RefreshToken 생성
        String refreshToken = jwtProvider.genRefreshToken(siteUser);

        return RsData.of("200-1", "로그인 성공", new AuthAndMakeTokensResponseBody(siteUser, accessToken, refreshToken));
    }

    @Transactional
    public RsData<SiteUser> delete(Long id) {
        RsData<SiteUser> siteUserRsData = this.getUserById(id);
        if (siteUserRsData.isFail()) {
            return siteUserRsData;
        }
        try {
            this.userRepository.delete(siteUserRsData.getData());
            return RsData.of(
                    "S-4",
                    "%d 번 삭제 완료".formatted(id)
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-4",
                    "삭제 실패",
                    null
            );
        }
    }

    @Transactional
    public RsData<SiteUser> updatePw(String email, String pw) {
        RsData<SiteUser> siteUserRsData = this.getUserByEmail(email);
        if (siteUserRsData.isFail()) {
            return siteUserRsData;
        }
        try {
            SiteUser updateUser = siteUserRsData.getData().toBuilder()
                    .password(passwordEncoder.encode(pw))
                    .build();
            this.userRepository.save(updateUser);
            return RsData.of(
                    "S-5",
                    "수정 완료",
                    updateUser);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "수정 실패",
                    null
            );
        }
    }

    public String generatePw() {
        StringBuilder pw = new StringBuilder(8);
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.ints(8, 0, characters.length())
                .mapToObj(characters::charAt)
                .forEach(pw::append);
        return pw.toString();
    }

    @Transactional
    public RsData<SiteUser> update(SiteUser user, String nickname, String email, String password) {
        try {
            SiteUser updateUser = user.toBuilder()
                    .nickname(nickname)
                    .password(passwordEncoder.encode(password))
                    .email(email)
                    .build();
            this.userRepository.save(updateUser);
            return RsData.of(
                    "S-5",
                    "%s 님 수정 완료".formatted(user.getUsername()),
                    updateUser);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "수정 실패",
                    null
            );
        }
    }
}
