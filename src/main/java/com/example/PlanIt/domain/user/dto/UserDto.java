package com.example.PlanIt.domain.user.dto;

import com.example.PlanIt.domain.user.entity.SiteUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public UserDto(SiteUser siteUser) {
        this.id = siteUser.getId();
        this.username = siteUser.getUsername();
        this.nickname = siteUser.getNickname();
        this.email = siteUser.getEmail();
        this.createdDate = siteUser.getCreatedDate();
        this.modifiedDate = siteUser.getModifiedDate();
    }
}
