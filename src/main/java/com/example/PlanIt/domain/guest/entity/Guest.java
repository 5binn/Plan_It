package com.example.PlanIt.domain.guest.entity;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Guest extends BaseEntity {
    @ManyToOne
    private Curriculum curriculum;
    @ManyToOne
    private SiteUser user;
    private boolean invite = false;
}
