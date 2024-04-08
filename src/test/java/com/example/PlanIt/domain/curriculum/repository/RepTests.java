package com.example.PlanIt.domain.curriculum.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class RepTests {
    @Autowired
    private CurriculumRepository curriculumRepository;

    @Test
    @DisplayName("데이터 가져오기")
    void test01() {
        Assertions.assertNull(curriculumRepository.findAll());
    }
}
