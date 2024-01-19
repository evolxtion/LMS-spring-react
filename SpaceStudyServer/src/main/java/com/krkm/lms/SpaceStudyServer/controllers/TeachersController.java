package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.entity.Teachers;
import com.krkm.lms.SpaceStudyServer.repository.ITeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/main/teachers")
public class TeachersController {
    
    @Autowired
    private ITeacherRepository iTeacherRepository;
    
//    @PostMapping(path="/add")
//    public

    @GetMapping(path="/get")
    public @ResponseBody Iterable<Teachers> getAllTeachers(){
        return iTeacherRepository.findAll();
    }
    
}
