package com.example.PlanIt.domain.guest.controller;

import com.example.PlanIt.domain.curriculum.dto.CurriculumDto;
import com.example.PlanIt.domain.curriculum.entity.Curriculum;
import com.example.PlanIt.domain.curriculum.entity.CurriculumForm;
import com.example.PlanIt.domain.curriculum.service.CurriculumService;
import com.example.PlanIt.domain.guest.dto.GuestDto;
import com.example.PlanIt.domain.guest.entity.Guest;
import com.example.PlanIt.domain.guest.entity.GuestForm;
import com.example.PlanIt.domain.guest.service.GuestService;
import com.example.PlanIt.domain.user.entity.SiteUser;
import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.rsData.RsData;
import com.example.PlanIt.global.util.Response;
import com.example.PlanIt.global.util.Util;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/guests")
@RequiredArgsConstructor
public class ApiV1GuestController {
    private final GuestService guestService;
    private final CurriculumService curriculumService;
    private final UserService userService;

    @GetMapping("")
    public RsData<Response.getGuests> getGuests() {
        RsData<List<Guest>> rsData = this.guestService.getGuests();
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getGuests(this.toDtoList(rsData.getData()))
        );
    }

    @GetMapping("/curriculum/{id}")
    public RsData<Response.getGuests> getGuestsByCurriculumId(@PathVariable("id") Long id) {
        RsData<List<Guest>> rsData = this.guestService.getGuestsByCurriculumId(id);
        System.out.println(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getGuests(this.toDtoList(rsData.getData()))
        );
    }

    @GetMapping("/user/{id}")
    public RsData<Response.getGuests> getGuestsByUserId(@PathVariable("id") Long id) {
        RsData<List<Guest>> rsData = this.guestService.getGuestsByUserId(id);
        System.out.println(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getGuests(this.toDtoList(rsData.getData()))
        );
    }

    @GetMapping("/{id}")
    public RsData<Response.getGuest> getGuest(@PathVariable("id") Long id) {
        RsData<Guest> rsData = this.guestService.getGuestById(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.getGuest(new GuestDto(rsData.getData().getCurriculum(), rsData.getData().getUser(), rsData.getData()))
        );
    }

    @PostMapping("/{id}") //커리큘럼 ID
    public RsData<Response.inviteGuest> inviteGuest(@PathVariable("id") Long curriculumId, @Valid @RequestBody GuestForm guestForm) {
        RsData<Curriculum> curriculumRsData = curriculumService.getCurriculumById(curriculumId);
        if (curriculumRsData.isFail()) {
            return (RsData) curriculumRsData;
        }
        RsData<SiteUser> userRsData = userService.getUserById(guestForm.getUserId());
        if (userRsData.isFail()) {
            return (RsData) userRsData;
        }
        RsData<Guest> guestRsData = this.guestService.invite(curriculumRsData.getData(), userRsData.getData());
        if (guestRsData.isFail()) {
            return (RsData) guestRsData;
        }
        return RsData.of(
                guestRsData.getResultCode(),
                guestRsData.getMessage(),
                new Response.inviteGuest(new GuestDto(guestRsData.getData().getCurriculum(), guestRsData.getData().getUser(), guestRsData.getData()))
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Response.rejectGuest> rejectGuest(@PathVariable("id") Long id) {
        RsData<Guest> rsData = this.guestService.reject(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage()
        );
    }

    @PatchMapping("/{id}")
    public RsData<Response.approveGuest> approveGuest(@PathVariable("id") Long id) {
        RsData<Guest> rsData = this.guestService.approve(id);
        if (rsData.isFail()) {
            return (RsData) rsData;
        }
        return RsData.of(
                rsData.getResultCode(),
                rsData.getMessage(),
                new Response.approveGuest(new GuestDto(rsData.getData().getCurriculum(), rsData.getData().getUser(), rsData.getData()))
        );
    }


    public List<GuestDto> toDtoList(List<Guest> guests) {
        List<GuestDto> guestDtoList = new ArrayList<>();
        for (Guest g : guests) {
            guestDtoList.add(new GuestDto(g.getCurriculum(), g.getUser(), g));
        }
        return guestDtoList;
    }
}
