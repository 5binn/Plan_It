package com.example.PlanIt.global.util;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.guest.dto.GuestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class Response {

    //Curriculum
    @Getter
    @AllArgsConstructor
    public static class getCurriculums {
        private List<CurriculumDto> curriculumDtoList;
    }
    @Getter
    @AllArgsConstructor
    public static class getCurriculum {
        private CurriculumDto curriculumDto;
    }
    @Getter
    @AllArgsConstructor
    public static class createCurriculum {
        private CurriculumDto curriculumDto;
    }
    @Getter
    @AllArgsConstructor
    public static class deleteCurriculum {
        private CurriculumDto curriculumDto;
    }
    @Getter
    @AllArgsConstructor
    public static class updateCurriculum {
        private CurriculumDto curriculumDto;
    }

    //guest
    @Getter
    @AllArgsConstructor
    public static class getGuests {
        private List<GuestDto> guestDtoList;
    }
    @Getter
    @AllArgsConstructor
    public static class getGuest {
        private GuestDto guestDto;
    }

    @Getter
    @AllArgsConstructor
    public static class inviteGuest {
        private GuestDto guestDto;
    }
    @Getter
    @AllArgsConstructor
    public static class rejectGuest {
        private GuestDto guestDto;
    }
    @Getter
    @AllArgsConstructor
    public static class approveGuest {
        private GuestDto guestDto;
    }

    //user
}
