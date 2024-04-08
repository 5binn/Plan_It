package com.example.PlanIt.domain.comment.controller;

import com.example.PlanIt.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class ApiV1CommentController {
    private final CommentService commentService;
}
