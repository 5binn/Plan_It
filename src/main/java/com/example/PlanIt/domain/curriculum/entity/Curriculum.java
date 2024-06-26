package com.example.PlanIt.domain.curriculum.entity;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Curriculum extends BaseEntity {
    private String name;
    @ManyToOne
    private SiteUser host;
    private LocalDate startDate;
    private LocalDate endDate;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.REMOVE)
    private List<Guest> guestList;
    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.REMOVE)
    private List<Schedule> scheduleList;
}
