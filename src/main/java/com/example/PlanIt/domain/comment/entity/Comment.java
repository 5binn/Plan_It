package com.example.PlanIt.domain.comment.entity;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseEntity {
    private String content;
    @ManyToOne
    private Schedule schedule;
    @ManyToOne
    private SiteUser author;
}
