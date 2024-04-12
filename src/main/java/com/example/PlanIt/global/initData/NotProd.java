package com.example.PlanIt.global.initData;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.comment.service.CommentService;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.guest.service.GuestService;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.schedule.service.ScheduleService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
@Profile({"dev","test"})
public class NotProd {

    @Bean
    CommandLineRunner initCurriculum(CurriculumService curriculumService, UserService userService, PasswordEncoder passwordEncoder,
                                     ScheduleService scheduleService, CommentService commentService, GuestService guestService) {
        return args ->{
            String password = passwordEncoder.encode("1234");

            SiteUser user1 = userService.create("user1", password, "닉네임1","test1@test.com").getData();
            SiteUser user2 = userService.create("user2", password, "닉네임2","test2@test.com").getData();
            SiteUser admin = userService.create("admin", password, "관리자","admin@test.com").getData();

            Curriculum curriculum1 = curriculumService.create("이름1",user1, LocalDate.now(), LocalDate.now().plusDays(1L)).getData();
            Curriculum curriculum2 = curriculumService.create("이름2",user1, LocalDate.now(), LocalDate.now().plusDays(2L)).getData();
            Curriculum curriculum3 = curriculumService.create("이름3",user2, LocalDate.now(), LocalDate.now().plusDays(3L)).getData();
            Curriculum curriculum4 = curriculumService.create("이름4",user2, LocalDate.now(), LocalDate.now().plusDays(4L)).getData();
            Curriculum curriculum5 = curriculumService.create("이름5",admin, LocalDate.now(), LocalDate.now().plusDays(5L)).getData();

            //커리큘럼에 유저를 초대
            guestService.invite(curriculum1, user1);
            guestService.invite(curriculum1, user2);
            guestService.invite(curriculum2, user1);
            guestService.invite(curriculum2, user2);
            guestService.invite(curriculum3, user1);

            Schedule schedule1 = scheduleService.create(curriculum1, "일정 내용입니다1", LocalDate.now().plusDays(1L)).getData();
            Schedule schedule2 = scheduleService.create(curriculum1, "일정 내용입니다2", LocalDate.now().plusDays(2L)).getData();
            Schedule schedule3 = scheduleService.create(curriculum2, "일정 내용입니다3", LocalDate.now().plusDays(3L)).getData();
            Schedule schedule4 = scheduleService.create(curriculum2, "일정 내용입니다4", LocalDate.now().plusDays(4L)).getData();
            Schedule schedule5 = scheduleService.create(curriculum3, "일정 내용입니다5", LocalDate.now().plusDays(5L)).getData();

            commentService.create(schedule1, user1, "댓글 내용입니다1");
            commentService.create(schedule1, user2, "댓글 내용입니다1");
            commentService.create(schedule2, user1, "댓글 내용입니다1");
            commentService.create(schedule2, user2, "댓글 내용입니다1");
            commentService.create(schedule3, user1, "댓글 내용입니다1");
        };
    }
}
