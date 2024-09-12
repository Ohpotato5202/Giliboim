package com.kh.giliboim.personal.controller;

import java.io.File;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.jwt.JwtProvider;
import com.kh.giliboim.personal.model.service.ChatService;
import com.kh.giliboim.common.Utils;
import com.kh.giliboim.personal.model.service.MyPageService;
import com.kh.giliboim.personal.model.vo.Friend;


import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
	
	@Value("${file.upload-dir}")
	private String uploadDir; 
	private final PasswordEncoder encoder;
	private final MyPageService myPageService;
	private final JwtProvider provider;
	private final ChatService chatService;
	
	@PutMapping("/update")
	public Map<String, Object> updateUser(
			@RequestPart String nickName,
			@RequestPart String pwd,
			@RequestPart String phone,
			@RequestPart(required = false) MultipartFile profile,
			HttpServletRequest request
			) {
		
		String token = provider.resolveToken(request);
		int memberNo = provider.getTokenMemberNo(token);
		
		String changePwd = encoder.encode(pwd);
		
	    Map<String, Object> map = new HashMap<>();

	    // member 객체 생성 : 요청시에 받을 수 있도록 해야함.
	    Member member = new Member();
	    member.setMemberNo(memberNo);
	    member.setNickname(nickName);
	    member.setPwd(changePwd);
	    member.setPhone(phone);
	    if(profile != null)
	    member.setProfile(null);

	    // 파일 저장 경로 설정
	    String absolutePath = Paths.get(uploadDir + "profile").toAbsolutePath().toString().toString();

	    if (profile != null && !profile.isEmpty()) {
	        String originalFilename = profile.getOriginalFilename();
	        String filePath = absolutePath + "/" + originalFilename;

	        try {
	            // 디렉토리가 존재하지 않으면 생성
	            File dir = new File(absolutePath);
	            if (!dir.exists()) {
	                dir.mkdirs();
	            }
	            // 파일 저장
	            String changeName = Utils.saveFile(profile, absolutePath);
	            member.setProfile(changeName); // 프로필 파일명 저장
	            
	        } catch (Exception e) {
	            log.error("파일 저장 중 오류 발생", e);
	            map.put("msg", "파일 저장 중 오류 발생.");
	            return map;
	        }
	    }

	    // 데이터베이스 업데이트
	    int result = myPageService.updateUser(member);

	    if (result > 0) {
	        map.put("msg", "회원 정보를 수정했습니다.");
	    } else {
	        map.put("msg", "회원 정보 수정에 실패했습니다.");
	    }

	    return map;
	}
	@PutMapping("/check-password")
	public Map<String, Object> checkPassword(@RequestParam String pwd,
			HttpServletRequest request) {
	    Map<String, Object> map = new HashMap<>();
	    String token = provider.resolveToken(request);
	    int memberNo = provider.getTokenMemberNo(token);
	    
	    map.put("memberNo", memberNo);
	    map.put("pwd", pwd);	    
	    
	    String changePwd = myPageService.checkPasswordByMemberNo(memberNo);
	    boolean isValid = encoder.matches(pwd, changePwd);
	    
	    if(isValid) {
	        map.put("isValid", true);
	    } else {
	        map.put("isValid", false);
	        map.put("msg", "비밀번호가 일치하지 않습니다.");
	    }

	    return map;
	}
	
	// 회원 탈퇴
    @DeleteMapping("/withdraw")
    public Map<String, Object> withdrawUser(@RequestParam String pwd, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        
        // JWT 토큰에서 사용자 정보를 추출
        String token = provider.resolveToken(request);
        int memberNo = provider.getTokenMemberNo(token);
        
        // 비밀번호 확인
        String changePwd = myPageService.checkPasswordByMemberNo(memberNo);
	    boolean isValid = encoder.matches(pwd, changePwd);
        
        if(isValid) {
        	// 비밀번호가 일치할 경우 회원 상태를 탈퇴로 변경
            int result = myPageService.withdrawUser(memberNo);
            if(result > 0) {
                map.put("msg", "회원 탈퇴가 완료되었습니다.");
                map.put("success", true);
            } else {
                map.put("msg", "회원 탈퇴에 실패했습니다.");
                map.put("success", false);
            }
        } else {
            map.put("msg", "비밀번호가 일치하지 않습니다.");
            map.put("success", false);
        }

        return map;
    }
    
    
    @GetMapping("/friendList")
    public List<Member> friendList(HttpServletRequest request){
    	
    	String token = provider.resolveToken(request);
	    int memberNo = provider.getTokenMemberNo(token);
	    	
	    List<Member> friendList = myPageService.friendList(memberNo);
	    log.debug("friendList {}", friendList);
	    return friendList;
    	
    }
    
    
    @GetMapping("/search")
    public List<Member> searchUser(@RequestParam String nickname) {
        List<Member> members = myPageService.searchByNickname(nickname);
        return members;
    }
    
    @PostMapping("/addFriend")
    public String addFriend(HttpServletRequest request,
    		@RequestBody Map<String, Integer> requestBody
    		){
    	
    	int memberNo = requestBody.get("memberNo");
    	String token = provider.resolveToken(request);
	    int nowMemberNo = provider.getTokenMemberNo(token);
	    
	    Map<String, Object> map = new HashMap<>();
	    
	    map.put("memberNo", memberNo);
	    map.put("nowMemberNo", nowMemberNo);
	    
	    if(myPageService.checkFriend(map) == 1) {
	    	return "이미 친구신청을 보냈거나, 친구입니다.";
	    }
	    
	    int result = myPageService.addFriend(map);
	    
	    if(result == 0) {
	    	return "친구신청을 보냈습니다.";
	    } else {
	    	map.put("chatRoomNo", 0);
	    	chatService.openChatRoom(map);
	    	
	    	return "친구가 되었습니다.";
	    }
	    
    }
    
    @DeleteMapping("/deleteFriend/{memberNo}")
    public ResponseEntity<String> deleteFriend(HttpServletRequest request, @PathVariable int memberNo) {
        String token = provider.resolveToken(request);
        int nowMemberNo = provider.getTokenMemberNo(token);
        
        Map<String, Object> map = new HashMap<>();
        map.put("memberNo", memberNo);
        map.put("nowMemberNo", nowMemberNo);
        
        boolean isDeleted = myPageService.deleteFriend(map);
        
        if (isDeleted) {
            return ResponseEntity.ok("삭제되었습니다");
        } else {
            return ResponseEntity.status(404).body("삭제할 친구를 찾을 수 없습니다.");
        }
    }
    
    
 
    
	
//	@DeleteMapping("/{MemberNo}")
//	public Map<String, Object> deleteUser(){
//		
//	}

}
	


