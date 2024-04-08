package com.example.PlanIt.domain.comment.repository;

import com.example.PlanIt.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
