package com.example.PlanIt.domain.user.service;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.repository.UserRepository;
import com.example.PlanIt.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public RsData<List<SiteUser>> getUsers() {
        return userRepository.findAll().isEmpty() ?
                RsData.of(
                        "F-1",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1",
                        "성공",
                        userRepository.findAll()
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

    @Transactional
    public RsData<SiteUser> create(String username, String password, String nickname, String email) {

        try {
            SiteUser siteUser = SiteUser.builder()
                    .username(username)
                    .password(password)
                    .nickname(nickname)
                    .email(email)
                    .build();
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
    public RsData<SiteUser> update(Long id, String nickname, String email) {
        RsData<SiteUser> siteUserRsData = this.getUserById(id);
        if (siteUserRsData.isFail()) {
            return siteUserRsData;
        }
        try {
            SiteUser updateUser = siteUserRsData.getData().toBuilder()
                    .nickname(nickname)
                    .email(email)
                    .build();
            this.userRepository.save(updateUser);
            return RsData.of(
                    "S-5",
                    "%d번 수정 완료".formatted(id),
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
