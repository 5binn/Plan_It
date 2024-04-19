package com.example.PlanIt.domain.curriculum.service;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.repository.CurriculumRepository;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Util;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class SerTests {
    @Autowired
    private CurriculumService curriculumService;
    @Autowired
    private CurriculumRepository curriculumRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("비번검증")
    void pwTest() {
        String enPW = passwordEncoder.encode("1234");
        System.out.println(enPW);
        System.out.println(passwordEncoder.matches("1234",enPW));
    }
    @Test
    @DisplayName("데이터 넣기")
    void test01() {
        RsData<Curriculum> curriculumRsData;
        try {
            Curriculum curriculum = Curriculum.builder()
                    .name("커리큘럼 이름1")
                    .host(new SiteUser())
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now().plusDays(2L))
                    .build();
            curriculumRepository.save(curriculum);
            curriculumRsData = RsData.of(
                    "S-3",
                    "등록 완료",
                    curriculum
            );
        } catch (Exception e) {
            curriculumRsData = RsData.of(
                    "F-3",
                    "등록 실패"
            );
        }
        Assertions.assertNotNull(curriculumRsData);
        System.out.println(Util.json.toJson(curriculumRsData));
    }

    @Test
    @DisplayName("다건")
    void test02() {
        RsData<List<Curriculum>> curriculumsRsData = curriculumRepository.findAll().isEmpty() ?
                RsData.of(
                        "F-1",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1",
                        "성공",
                        curriculumRepository.findAll()
                );

        Assertions.assertNotNull(curriculumsRsData);
        System.out.println(Util.json.toJson(curriculumsRsData));
    }

    @Test
    @DisplayName("단건")
    void test03() {
        Object o = curriculumRepository.findById(1L).map((curriculum) -> RsData.of(
                "S-2",
                "성공",
                        curriculum
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 데이터 없음".formatted(1L)
        ));
        Assertions.assertNotNull(o);
        System.out.println(Util.json.toJson(o));
    }

    @Test
    @DisplayName("삭제")
    void test04() {
        RsData<Curriculum> curriculumRsData = curriculumService.getCurriculumById(1L);
        if (curriculumRsData.isSuccess()) {
            try {
                this.curriculumRepository.delete(curriculumRsData.getData());
                curriculumRsData = RsData.of(
                        "S-4",
                        "%d 번 삭제 완료".formatted(1L),
                        curriculumRsData.getData()
                );
            } catch (Exception e) {
                e.printStackTrace();
                curriculumRsData =  RsData.of(
                        "F-4",
                        "삭제 실패",
                        null
                );
            }
        }

        Assertions.assertNotNull(curriculumRsData);
        System.out.println(Util.json.toJson(curriculumRsData));
    }

    @Test
    @DisplayName("수정")
    void test05() {
        RsData<Curriculum> curriculumRsData = curriculumService.getCurriculumById(1L);
        if (curriculumRsData.isSuccess()) {
            try {
                Curriculum updateCurriculum = curriculumRsData.getData().toBuilder()
                        .name("커리큘럼 수정")
                        .startDate(LocalDate.now().minusDays(1L))
                        .endDate(LocalDate.now().plusDays(1L))
                        .build();
                this.curriculumRepository.save(updateCurriculum);
                curriculumRsData = RsData.of(
                        "S-5",
                        "수정 완료",
                        updateCurriculum);
            } catch (Exception e) {
                curriculumRsData = RsData.of(
                        "F-5",
                        "수정 실패",
                        null
                );
            }
        }

        Assertions.assertNotNull(curriculumRsData);
        System.out.println(Util.json.toJson(curriculumRsData));
    }

}
