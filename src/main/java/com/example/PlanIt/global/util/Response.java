package com.example.PlanIt.global.util;

import com.example.PlanIt.domain.comment.dto.CommentDto;
import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.dto.GuestDto;
import com.example.PlanIt.domain.schedule.dto.ScheduleDto;
import com.example.PlanIt.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class Response {

    //Curriculum
    @Getter
    @AllArgsConstructor
    public static class getCurriculums {
        private List<CurriculumDto> curriculumList;
    }

    @Getter
    @AllArgsConstructor
    public static class getCurriculum {
        private CurriculumDto curriculum;
    }

    @Getter
    @AllArgsConstructor
    public static class createCurriculum {
        private CurriculumDto curriculum;
    }

    @Getter
    @AllArgsConstructor
    public static class deleteCurriculum {
        private CurriculumDto curriculum;
    }

    @Getter
    @AllArgsConstructor
    public static class updateCurriculum {
        private CurriculumDto curriculum;
    }

    //guest
    @Getter
    @AllArgsConstructor
    public static class getGuests {
        private List<GuestDto> guestList;
    }

    @Getter
    @AllArgsConstructor
    public static class getGuest {
        private GuestDto guest;
    }

    @Getter
    @AllArgsConstructor
    public static class inviteGuest {
        private GuestDto guest;
    }

    @Getter
    @AllArgsConstructor
    public static class rejectGuest {
        private GuestDto guest;
    }

    @Getter
    @AllArgsConstructor
    public static class approveGuest {
        private GuestDto guest;
    }

    //schedule
    @Getter
    @AllArgsConstructor
    public static class getSchedules {
        private List<ScheduleDto> scheduleList;
    }

    @Getter
    @AllArgsConstructor
    public static class getSchedule {
        private ScheduleDto schedule;
    }

    @Getter
    @AllArgsConstructor
    public static class createSchedule {
        private ScheduleDto schedule;
    }

    @Getter
    @AllArgsConstructor
    public static class deleteSchedule {
        private ScheduleDto schedule;
    }

    @Getter
    @AllArgsConstructor
    public static class updateSchedule {
        private ScheduleDto schedule;
    }

    //comment
    @Getter
    @AllArgsConstructor
    public static class getComments {
        private List<CommentDto> commentList;
    }

    @Getter
    @AllArgsConstructor
    public static class getComment {
        private CommentDto comment;
    }

    @Getter
    @AllArgsConstructor
    public static class createComment {
        private CommentDto comment;
    }

    @Getter
    @AllArgsConstructor
    public static class deleteComment {
        private CommentDto comment;
    }

    @Getter
    @AllArgsConstructor
    public static class updateComment {
        private CommentDto comment;
    }


    //user
    @Getter
    @AllArgsConstructor
    public static class getUsers {
        private List<UserDto> userDtoList;
    }

}
