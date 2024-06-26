package com.example.PlanIt.domain.schedule.repository;

import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s WHERE s.curriculum.id = :curriculumId")
    List<Schedule> findSchedulesByCurriculumId(@Param("curriculumId") Long curriculumId);
}
