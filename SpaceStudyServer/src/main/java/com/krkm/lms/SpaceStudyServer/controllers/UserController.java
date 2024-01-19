package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.entity.Course;
import com.krkm.lms.SpaceStudyServer.entity.User;
import com.krkm.lms.SpaceStudyServer.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
@RequestMapping(path="/user")
public class UserController {
    
    @Autowired
    private IUserRepository iUserRepository;
    
    @GetMapping(path="/{id}")
    public @ResponseBody
    Optional<User> getCourseById(@PathVariable Integer id){
        return iUserRepository.findById(id);
    }
    
    
    
}
