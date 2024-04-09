package com.example.PlanIt.global.initData;

import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@Profile({"dev","test"})
public class NotProd {

    @Bean
    CommandLineRunner initCurriculum(CurriculumService curriculumService, UserService userService, PasswordEncoder passwordEncoder) {
        return args ->{
            String password = passwordEncoder.encode("1234");
            SiteUser user1 = userService.create("user1", password, "닉네임1","test1@test.com").getData();
            SiteUser user2 = userService.create("user2", password, "닉네임2","test2@test.com").getData();
            SiteUser admin = userService.create("admin", password, "관리자","admin@test.com").getData();

            curriculumService.create("이름1",user1, LocalDateTime.now(), LocalDateTime.now().plusDays(1L));
            curriculumService.create("이름2",user1, LocalDateTime.now(), LocalDateTime.now().plusDays(2L));
            curriculumService.create("이름3",user2, LocalDateTime.now(), LocalDateTime.now().plusDays(3L));
            curriculumService.create("이름4",user2, LocalDateTime.now(), LocalDateTime.now().plusDays(4L));
            curriculumService.create("이름5",admin, LocalDateTime.now(), LocalDateTime.now().plusDays(5L));
        };
    }
}
