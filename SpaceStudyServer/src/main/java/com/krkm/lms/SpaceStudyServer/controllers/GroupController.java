package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.entity.Group;
import com.krkm.lms.SpaceStudyServer.repository.IGroupRepository;
import com.krkm.lms.SpaceStudyServer.requests.GroupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Controller
@RequestMapping(path="/groups")
public class GroupController {
    
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    @Autowired
    private IGroupRepository groupRepository;
    
    @PostMapping(path="/add" )
    public ResponseEntity<?> addGroup(@RequestBody GroupRequest groupRequest){
        
        if(groupRepository.findByName(groupRequest.getNameGroup()) != null){
//            if(Objects.equals(groupRepository.findByName(nameGroup).getName(), nameGroup)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Група с таким ім'ям вже існує");
//            }
        }
    
        Group group = new Group();
        group.setName(groupRequest.getNameGroup());
        group.setSpeciality(groupRequest.getSpeciality());
        
        String keyCode = generateString(6);
        
        while (groupRepository.findByKey(keyCode) != null) {
            keyCode = generateString(6);
        }
    
        group.setSerialKey(keyCode);
        groupRepository.save(group);
        
        return ResponseEntity.status(HttpStatus.OK).body("Успішне додавання групи в БД");
    }
    
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Group> getAllGroups(){
        return groupRepository.findAll();
    }
    
    
    public String generateString(int length){
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();
    
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        
        return sb.toString();
    }
    
}
