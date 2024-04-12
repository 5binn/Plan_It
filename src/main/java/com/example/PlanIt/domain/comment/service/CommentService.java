package com.example.PlanIt.domain.comment.service;

import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.comment.repository.CommentRepository;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public RsData<List<Comment>> getCommentsByScheduleId(Long scheduleId) {
        return commentRepository.findCommentsByScheduleId(scheduleId).isEmpty() ?
                RsData.of(
                        "F-1S",
                        "데이터 없음"
                ) :
                RsData.of(
                        "S-1S",
                        "성공",
                        commentRepository.findCommentsByScheduleId(scheduleId)
                );
    }


    public RsData<Comment> getCommentById(Long id) {
        return commentRepository.findById(id).map((comment) -> RsData.of(
                "S-2",
                "성공",
                comment
        )).orElseGet(() -> RsData.of(
                "F-2",
                "%d번 데이터 없음".formatted(id)
        ));
    }
    @Transactional
    public RsData<Comment> create(Schedule schedule, SiteUser author,  String content) {
        try {
            Comment comment = Comment.builder()
                    .schedule(schedule)
                    .author(author)
                    .content(content)
                    .build();
            commentRepository.save(comment);
            return RsData.of(
                    "S-3",
                    "등록 완료",
                    comment
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-3",
                    "등록 실패"
            );
        }
    }
    @Transactional
    public RsData<Comment> delete(Long id) {
        RsData<Comment> commentRsData = this.getCommentById(id);
        if (commentRsData.isFail()) {
            return commentRsData;
        }
        try {
            this.commentRepository.delete(commentRsData.getData());
            return RsData.of(
                    "S-4",
                    "%d 번 삭제 완료".formatted(id)
            );
        } catch (Exception e) {
            return RsData.of(
                    "F-4",
                    "삭제 실패"
            );
        }
    }
    @Transactional
    public RsData<Comment> update(Long id, String content) {
        RsData<Comment> commentRsData = this.getCommentById(id);
        if (commentRsData.isFail()) {
            return commentRsData;
        }
        try {
            Comment updateComment = commentRsData.getData().toBuilder()
                    .content(content)
                    .build();
            this.commentRepository.save(updateComment);
            return RsData.of(
                    "S-5",
                    "%d번 수정 완료".formatted(id),
                    updateComment);
        } catch (Exception e) {
            return RsData.of(
                    "F-5",
                    "수정 실패",
                    null
            );
        }
    }
}
