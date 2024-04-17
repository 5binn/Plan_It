package com.example.PlanIt.domain.user.repository;

import com.example.PlanIt.domain.user.entity.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {
    Optional<SiteUser> findByUsername(String username);

    Optional<SiteUser> findByRefreshToken(String refreshToken);


    @Query("SELECT u from SiteUser u WHERE "
            + "   u.nickname LIKE %:keyword% "
            + "   OR u.username LIKE %:keyword% ")
    List<SiteUser> findByKeyword(@Param("keyword") String keyword);
}
