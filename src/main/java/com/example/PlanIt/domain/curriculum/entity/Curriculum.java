package com.example.PlanIt.domain.curriculum.entity;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

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
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @ManyToMany
    @JoinTable(
            name = "curriculum_guests", // 매핑 테이블의 이름
            joinColumns = @JoinColumn(name = "curriculum_id"), // Curriculum 엔티티의 외래 키
            inverseJoinColumns = @JoinColumn(name = "guest_id") // SiteUser 엔티티의 외래 키
    )
    private List<SiteUser> guests;
}
