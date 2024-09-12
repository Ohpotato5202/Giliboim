package com.kh.giliboim.account.model.service;

import com.kh.giliboim.config.twilio.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Random;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor

public class TwilioService {

    private final TwilioConfig twilioConfig;

    public String sendVerificationCode(String phoneNumber) {
        String verificationCode = String.format("%06d", new Random().nextInt(1000000));
        String messageBody = verificationCode;
        log.info("인증코드 = {}",verificationCode);
        
//        log.info("여기까지 진행됨.");
//        
//        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
//
//        String asdf = "asdfasdf";
//        
//        log.info("여기까지 진행됨.222222");
//        log.info("To폰 번호 = {}",phoneNumber);
//        log.info("From폰 번호 = {}",twilioConfig.getPhoneNumber());
//        
//        Message message = Message.creator(
//                new com.twilio.type.PhoneNumber("+821091723418"), //phoneNumber가 문자열이 아니라 객체로 받아지고 있음
//                new PhoneNumber(twilioConfig.getPhoneNumber()),
//                messageBody
//        ).create();
//        
//        log.info("문자 발송됨. 유저정보 = {}",message);

        return verificationCode;
    }
}
