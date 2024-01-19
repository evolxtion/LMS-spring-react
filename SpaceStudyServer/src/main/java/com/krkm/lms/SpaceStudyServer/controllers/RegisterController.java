package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.auth.RegisterRequest;
import com.krkm.lms.SpaceStudyServer.entity.User;
import com.krkm.lms.SpaceStudyServer.repository.IGroupRepository;
import com.krkm.lms.SpaceStudyServer.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/register")
public class RegisterController {
    
    @Autowired
    private IUserRepository userRepository;
    
    @Autowired
    private IGroupRepository groupRepository;
    
    BCryptPasswordEncoder b = new BCryptPasswordEncoder();
    
    User user = new User();
    
    @PostMapping(path="/addFirstStep")
    public ResponseEntity<?> registerFirstStep(@RequestBody RegisterRequest registerRequest){
        
        if(isUserFound(registerRequest.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Користувач з таким Email вже знайдено");
        }
        
        if(!isGroupFound(registerRequest.getSerial_key())){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Групи не знайдено / невірний ключ групи");
        }
        
        user.setEmail(registerRequest.getEmail());
        user.setContact(registerRequest.getContact());
//        user.set
        
        
        return ResponseEntity.status(HttpStatus.OK).body("First step reg done");
    }
    
    @PostMapping(path = "/addTwoStep")
    public ResponseEntity<?> registerTwoStep(@RequestBody RegisterRequest registerRequest){
        
        return ResponseEntity.status(HttpStatus.OK).body("Second step reg done");
    }
    
    @PostMapping(path = "/addThirdStep")
    public ResponseEntity<?> registerThirdStep(@RequestBody RegisterRequest registerRequest){
        
        return ResponseEntity.status(HttpStatus.OK).body("Third step reg done");
    }
    
    
    private boolean isUserFound(String email){
       return userRepository.findByEmail(email) != null;
    }
    
    private boolean isGroupFound(String keySerial){
        return groupRepository.findByKey(keySerial) != null;
    }
    
}
