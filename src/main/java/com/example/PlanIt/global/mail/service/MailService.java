package com.example.PlanIt.global.mail.service;

import com.example.PlanIt.global.mail.dto.MailDto;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender javaMailSender;
    private static final String from = "dhxnejqls13@naver.com";

    public void sendMail(MailDto mailDto) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mailDto.getTo());
        msg.setSubject(mailDto.getTitle());
        msg.setText(mailDto.getContent());
        javaMailSender.send(msg);
    }
}
