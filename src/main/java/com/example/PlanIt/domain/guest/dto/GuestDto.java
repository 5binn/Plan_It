package com.example.PlanIt.domain.guest.dto;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.user.dto.UserDto;
import com.example.PlanIt.domain.user.entity.SiteUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class GuestDto {
    private Long id;
    private String curriculumName;
    private String username;
    private String nickname;
    private String invite;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public GuestDto(Curriculum curriculum, SiteUser siteUser, Guest guest) {
        this.id = guest.getId();
        this.curriculumName = curriculum.getName();
        this.username = siteUser.getUsername();
        this.nickname = siteUser.getNickname();
        this.invite = guest.isInvite() ? "승인" : "대기";
        this.createdDate = guest.getCreatedDate();
        this.modifiedDate = guest.getModifiedDate();
    }


}
