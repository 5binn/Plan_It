package com.example.PlanIt.domain.user.entity;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.global.jpa.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
    @JsonIgnore
    private String password;
    private String nickname;
    private String email;

    @OneToMany(mappedBy = "host", cascade = CascadeType.REMOVE)
    private List<Curriculum> curriculumList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Guest> guestList;
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;
}
