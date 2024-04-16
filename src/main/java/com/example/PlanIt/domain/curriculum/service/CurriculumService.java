package com.example.PlanIt.domain.curriculum.service;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.repository.CurriculumRepository;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CurriculumService {
    private final CurriculumRepository curriculumRepository;



    public RsData<List<Curriculum>> getCurriculums() {
        return curriculumRepository.findAll().isEmpty() ?
                RsData.of(
                        "F-1",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1",
                        "성공",
                        curriculumRepository.findAll()
                );
    }
    public RsData<List<Curriculum>> getCurriculumsByUsername(String username) {
        return curriculumRepository.findCurriculumsByHostOrGuestUsername(username).isEmpty() ?
                RsData.of(
                        "F-1U",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1U",
                        "성공",
                        curriculumRepository.findCurriculumsByHostUsername(username)
                );
    }

    public RsData<List<Curriculum>> getCurriculumsByHost(String username) {
        return curriculumRepository.findCurriculumsByHostUsername(username).isEmpty() ?
                RsData.of(
                        "F-1H",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1H",
                        "성공",
                        curriculumRepository.findCurriculumsByHostUsername(username)
                );
    }
    public RsData<List<Curriculum>> getCurriculumsByGuest(String username) {
        return curriculumRepository.findCurriculumsByGuestUsername(username).isEmpty() ?
                RsData.of(
                        "F-1G",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1G",
                        "성공",
                        curriculumRepository.findCurriculumsByGuestUsername(username)
                );
    }

    public RsData<Curriculum> getCurriculumById(Long id) {
        return curriculumRepository.findById(id).map((curriculum) -> RsData.of(
                "S-2",
                "성공",
                curriculum
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 데이터 없음".formatted(id)
        ));
    }



    @Transactional
    public RsData<Curriculum> create(String name, SiteUser host, LocalDate startDate, LocalDate endDate) {
        try {
            Curriculum curriculum = Curriculum.builder()
                    .name(name)
                    .host(host)
                    .startDate(startDate)
                    .endDate(endDate)
                    .build();
            curriculumRepository.save(curriculum);
            return RsData.of(
                    "S-3",
                    "등록 완료",
                    curriculum
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-3",
                    "등록 실패"
            );
        }
    }
    @Transactional
    public RsData<Curriculum> delete(Long id) {
        RsData<Curriculum> curriculumRsData = this.getCurriculumById(id);
        if (curriculumRsData.isFail()) {
            return curriculumRsData;
        }
        try {
            this.curriculumRepository.delete(curriculumRsData.getData());
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
    public RsData<Curriculum> update(Long id, String name, LocalDate startDate, LocalDate endDate) {
        RsData<Curriculum> curriculumRsData = this.getCurriculumById(id);
        if (curriculumRsData.isFail()) {
            return curriculumRsData;
        }
        try {
            Curriculum updateCurriculum = curriculumRsData.getData().toBuilder()
                    .name(name)
                    .startDate(startDate)
                    .endDate(endDate)
                    .build();
            this.curriculumRepository.save(updateCurriculum);
            return RsData.of(
                    "S-5",
                    "%d번 수정 완료".formatted(id),
                    updateCurriculum);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "수정 실패",
                    null
            );
        }
    }
}
