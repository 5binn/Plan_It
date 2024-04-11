package com.example.PlanIt.domain.user.controller;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.entity.UserForm;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.rsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class ApiV1UserController {
    private final UserService userService;

    @GetMapping("")
    public RsData<List<SiteUser>> getUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/{id}")
    public RsData<SiteUser> getUser(@PathVariable("id") Long id) {
        return this.userService.getUserById(id);
    }

    @PostMapping("")
    public RsData<SiteUser> signIn(@Valid @RequestBody UserForm userForm) {
        return userService.create(userForm.getUsername(), userForm.getPassword1(), userForm.getNickname(), userForm.getEmail());
    }
}
