package com.example.PlanIt.domain.guest.repository;

import com.example.PlanIt.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    @Query("SELECT g FROM Guest g WHERE g.user.id = :userId")
    List<Guest> findGuestsByUserId(@Param("userId") Long userId);

    @Query("SELECT g FROM Guest g WHERE g.curriculum.id = :curriculumId")
    List<Guest> findGuestsByCurriculumId(@Param("curriculumId") Long curriculumId);
}
