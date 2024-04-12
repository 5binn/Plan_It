package com.example.PlanIt.domain.comment.repository;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment s WHERE c.schedule.id = :scheduleId")
    List<Comment> findCommentsByScheduleId(@Param("scheduleId") Long scheduleId);
}
