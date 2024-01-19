package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.entity.Course;
import com.krkm.lms.SpaceStudyServer.entity.Task;
import com.krkm.lms.SpaceStudyServer.repository.ITaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TaskController {
    
    @Autowired
    private ITaskRepository iTaskRepository;
    
    @GetMapping(path="/subjects/{idSubject}/tasks")
    public @ResponseBody Iterable<Task> getTaskBySubjectId(@PathVariable int idSubject){
        return iTaskRepository.findByTaskId(idSubject);
    }
    
}
