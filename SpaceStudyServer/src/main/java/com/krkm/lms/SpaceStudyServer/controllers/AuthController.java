package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.auth.AuthRequest;
import com.krkm.lms.SpaceStudyServer.auth.AuthorizationRequest;
import com.krkm.lms.SpaceStudyServer.entity.User;
import com.krkm.lms.SpaceStudyServer.repository.IUserRepository;
import com.krkm.lms.SpaceStudyServer.utils.CookiesUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping(path="/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    
    @Autowired
    private IUserRepository userRepository;
    
    
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    
    @PostMapping(path="/authorization")
    public ResponseEntity<?> login(@RequestBody AuthorizationRequest loginRequest){
        if(!isUserValid(loginRequest.getEmail(), loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Невірний E-mail або пароль");
        }
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("hashToken", userRepository.findByEmail(loginRequest.getEmail()).getPassword());
        headers.add("userId", userRepository.findByEmail(loginRequest.getEmail()).getId().toString());
    
        return ResponseEntity.ok().headers(headers).body(HttpStatus.OK);
    }
    
    @PostMapping(path="/auth")
    public ResponseEntity<?> auth(@RequestBody AuthRequest authRequest){
        System.out.println(authRequest.getUserId());
        Optional<User> userOptional = userRepository.findById(authRequest.getUserId());
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(user.getPassword().equals(CookiesUtils.decodeValue(authRequest.getHashToken()))){
                System.out.println("check auth for user ID: [" + user.getId() + " | " + user.getEmail() + "] well done!");
                if(user.isAdmin()){
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("isAdmin", "true");
                    System.out.println(headers);
                    return ResponseEntity.ok().headers(headers).body(HttpStatus.OK);
                }
                return ResponseEntity.ok().body(HttpStatus.OK);
            }
        }
        return ResponseEntity.internalServerError().body(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    private boolean isUserValid(String email, String password){
        if(userRepository.findByEmail(email) == null){
            System.out.println("User email not found!");
            return false;
        }
        
        System.out.println(bCryptPasswordEncoder.matches(password, userRepository.findByEmail(email).getPassword()));
        
        return bCryptPasswordEncoder.matches(password, userRepository.findByEmail(email).getPassword());
    }
    
    public String removeAfterAt(String input) {
        if (input == null) {
            return null;
        }
        
        int atIndex = input.indexOf('@');
        if (atIndex != -1) {
            return input.substring(0, atIndex);
        } else {
            return input;
            
        }
    }
    
    
}
