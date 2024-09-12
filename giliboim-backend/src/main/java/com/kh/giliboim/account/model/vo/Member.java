package com.kh.giliboim.account.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    private int memberNo;
    private int authorityNo;
    private int stNo;
    private String id; 
    private String phone;
    private String pwd;
    private String name;
    private String nickname;
    private String birthdate;
    private String enrollDate;
    private String modifyDate;
    private String status;
    private String loginStatus;
    private String profile;    

}
