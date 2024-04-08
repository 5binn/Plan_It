package com.example.PlanIt.domain.schedule.entity;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Schedule extends BaseEntity {
    @ManyToOne
    private Curriculum curriculum;
    private String content;
    private LocalDate date;
}
