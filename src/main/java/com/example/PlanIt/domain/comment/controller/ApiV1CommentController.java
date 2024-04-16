package com.example.PlanIt.domain.comment.controller;

import com.example.PlanIt.domain.comment.dto.CommentDto;
import com.example.PlanIt.domain.comment.entity.Comment;
import com.example.PlanIt.domain.comment.entity.CommentForm;
import com.example.PlanIt.domain.comment.service.CommentService;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.schedule.dto.ScheduleDto;
import com.example.PlanIt.domain.schedule.entity.Schedule;
import com.example.PlanIt.domain.schedule.entity.ScheduleForm;
import com.example.PlanIt.domain.schedule.service.ScheduleService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.request.Rq;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Response;
import com.example.PlanIt.global.util.Util;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class ApiV1CommentController {
    private final CommentService commentService;
    private final ScheduleService scheduleService;
    private final UserService userService;
    private final Rq rq;


    @GetMapping("/schedule/{id}") //스케줄 ID
    public RsData<Response.getComments> getCommentsByScheduleId(@PathVariable("id") Long id) {
        RsData<List<Comment>> rsData = this.commentService.getCommentsByScheduleId(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getComments(this.toDtoList(rsData.getData()))
        );
    }

    @GetMapping("/{id}")
    public RsData<Response.getComment> getComment(@PathVariable("id") Long id) {
        RsData<Comment> rsData = this.commentService.getCommentById(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getComment(new CommentDto(rsData.getData().getSchedule(), rsData.getData().getAuthor(), rsData.getData()))
        );
    }

    @PostMapping("/{id}") //스케줄 ID
    public RsData<Response.createComment> createComment(@PathVariable("id") Long id, @Valid @RequestBody CommentForm commentForm) {
        RsData<Schedule> scheduleRsData = scheduleService.getScheduleById(id);
        if (scheduleRsData.isFail()) {
            return (RsData) scheduleRsData;
        }
        SiteUser author = rq.getMember();
        RsData<Comment> commentRsData = commentService.create(scheduleRsData.getData(), author, commentForm.getContent());
        if (commentRsData.isFail()) {
            return (RsData) commentRsData;
        }
        return RsData.of(
                commentRsData.getResultCode(),
                commentRsData.getMessage(),
                new Response.createComment(new CommentDto(commentRsData.getData().getSchedule(), commentRsData.getData().getAuthor(), commentRsData.getData()))
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Response.deleteComment> deleteComment(@PathVariable("id") Long id) {
        RsData<Comment> rsData = this.commentService.delete(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage()
        );
    }

    @PatchMapping("/{id}")
    public RsData<Response.updateComment> updateComment(@PathVariable("id") Long id, @Valid @RequestBody CommentForm commentForm) {
        RsData<Comment> rsData = this.commentService.update(id, commentForm.getContent());
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.updateComment(new CommentDto(rsData.getData().getSchedule(), rsData.getData().getAuthor(), rsData.getData()))
        );
    }

    public List<CommentDto> toDtoList(List<Comment> comments) {
        List<CommentDto> commentDtoList = new ArrayList<>();
        for (Comment c : comments) {
            commentDtoList.add(new CommentDto(c.getSchedule(), c.getAuthor(), c));
        }
        return commentDtoList;
    }
}
