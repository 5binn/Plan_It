package com.example.PlanIt.domain.curriculum.repository;

import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurriculumRepository extends JpaRepository<Curriculum, Long> {

    @Query("SELECT c FROM Curriculum c JOIN c.host h WHERE h.username = :username")

    List<Curriculum> findCurriculumsByHostUsername(@Param("username") String username);
    @Query("SELECT c FROM Curriculum c JOIN c.guestList g WHERE g.user.username = :username ")
    List<Curriculum> findCurriculumsByGuestUsername(@Param("username") String username);

    @Query("SELECT DISTINCT c " +
            "FROM Curriculum c " +
            "LEFT JOIN Guest g ON c.id = g.curriculum.id " +
            "LEFT JOIN siteUser u ON g.user.id = u.id " +
            "WHERE c.host.id IN (SELECT id FROM siteUser WHERE username = :username ) " +
            "OR u.username = :username ")
    List<Curriculum> findCurriculumsByHostOrGuestUsername(@Param("username") String username);


}
