package com.krkm.lms.SpaceStudyServer.controllers;

import com.krkm.lms.SpaceStudyServer.entity.Course;
import com.krkm.lms.SpaceStudyServer.repository.ICourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/subjects")
public class CourseController {
    
    @Autowired
    private ICourseRepository iCourseRepository;
    
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Course> getCourse(){
        return iCourseRepository.findAll();
    }
    
    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Course> getCourseById(@PathVariable Integer id){
        return iCourseRepository.findById(id);
    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteCourseById(@PathVariable Integer id) {
        try {
            iCourseRepository.deleteById(id);
            return ResponseEntity.ok().body("Course deleted successfully.");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete course.");
        }
    }
}
