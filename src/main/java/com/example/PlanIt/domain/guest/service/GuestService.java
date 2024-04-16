package com.example.PlanIt.domain.guest.service;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.guest.repository.GuestRepository;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestService {
    private final GuestRepository guestRepository;

    public RsData<List<Guest>> getGuests() {
        return guestRepository.findAll().isEmpty() ?
                RsData.of(
                        "F-1A",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1A",
                        "성공",
                        guestRepository.findAll()
                );
    }

    public RsData<List<Guest>> getGuestsByUserId(Long userId) {
        return guestRepository.findGuestsByUserId(userId).isEmpty() ?
                RsData.of(
                        "F-1U",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1U",
                        "성공",
                        guestRepository.findGuestsByUserId(userId)
                );
    }

    public RsData<List<Guest>> getGuestsByCurriculumId(Long curriculumId) {
        return guestRepository.findGuestsByCurriculumId(curriculumId).isEmpty() ?
                RsData.of(
                        "F-1C",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1C",
                        "성공",
                        guestRepository.findGuestsByCurriculumId(curriculumId)
                );
    }

    public RsData<List<Guest>> getApprovedGuestsByCurriculumId(Long curriculumId) {
        return guestRepository.findGuestsByCurriculumIdTrue(curriculumId).isEmpty() ?
                RsData.of(
                        "F-1CA",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1CA",
                        "성공",
                        guestRepository.findGuestsByCurriculumIdTrue(curriculumId)
                );
    }
    public RsData<List<Guest>> getWaitingGuestsByCurriculumId(Long curriculumId) {
        return guestRepository.findGuestsByCurriculumIdFalse(curriculumId).isEmpty() ?
                RsData.of(
                        "F-1CW",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1CW",
                        "성공",
                        guestRepository.findGuestsByCurriculumIdFalse(curriculumId)
                );
    }

    public RsData<Guest> getGuestById(Long id) {
        return guestRepository.findById(id).map((curriculum) -> RsData.of(
                "S-2",
                "성공",
                curriculum
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 데이터 없음".formatted(id)
        ));
    }

    @Transactional
    public RsData<Guest> invite(Curriculum curriculum, SiteUser user) {
        try {
            Guest guest = Guest.builder()
                    .curriculum(curriculum)
                    .user(user)
                    .build();
            guestRepository.save(guest);
            return RsData.of(
                    "S-3",
                    "초대 완료",
                    guest
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-3",
                    "초대 실패"
            );
        }
    }
    @Transactional
    public void own(Curriculum curriculum, SiteUser user) {
            Guest guest = Guest.builder()
                    .curriculum(curriculum)
                    .user(user)
                    .invite(true)
                    .build();
            guestRepository.save(guest);
    }

    @Transactional
    public RsData<Guest> reject(Long id) {
        RsData<Guest> guestRsData = this.getGuestById(id);
        if (guestRsData.isFail()) {
            return guestRsData;
        }
        try {
            this.guestRepository.delete(guestRsData.getData());
            return RsData.of(
                    "S-4",
                    "거절 완료"
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-4",
                    "거절 실패"
            );
        }
    }

    @Transactional
    public RsData<Guest> approve(Long id) {
        RsData<Guest> guestRsData = this.getGuestById(id);
        if (guestRsData.isFail()) {
            return guestRsData;
        }
        try {
            Guest approveGuest = guestRsData.getData().toBuilder()
                    .invite(true)
                    .build();
            this.guestRepository.save(approveGuest);
            return RsData.of(
                    "S-5",
                    "승인 완료",
                    approveGuest);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "승인 실패"
            );
        }
    }
}
