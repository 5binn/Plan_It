package com.example.PlanIt.domain.user.entity;

import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SiteUser extends BaseEntity {
    private String username;
    private String password;
    private String nickname;
    private String email;
}
