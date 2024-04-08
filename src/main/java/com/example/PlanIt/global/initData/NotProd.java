package com.example.PlanIt.global.initData;

import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;

@Configuration
@Profile({"dev","test"})
public class NotProd {

    @Bean
    CommandLineRunner initCurriculum(CurriculumService curriculumService) {
        return args ->{
            curriculumService.create("이름1",null, LocalDateTime.now(), LocalDateTime.now().plusDays(1L));
            curriculumService.create("이름2",null, LocalDateTime.now(), LocalDateTime.now().plusDays(2L));
            curriculumService.create("이름3",null, LocalDateTime.now(), LocalDateTime.now().plusDays(3L));
            curriculumService.create("이름4",null, LocalDateTime.now(), LocalDateTime.now().plusDays(4L));
            curriculumService.create("이름5",null, LocalDateTime.now(), LocalDateTime.now().plusDays(5L));
        };
    }
}
