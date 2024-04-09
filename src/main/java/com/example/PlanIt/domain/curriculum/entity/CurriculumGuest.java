package com.example.PlanIt.domain.curriculum.entity;

import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class CurriculumGuest extends BaseEntity {
    @ManyToOne
    private Curriculum curriculum;
    @ManyToOne
    private SiteUser guest;
}
