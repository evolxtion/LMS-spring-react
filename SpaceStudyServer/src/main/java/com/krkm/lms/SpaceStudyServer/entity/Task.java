package com.krkm.lms.SpaceStudyServer.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Tasks")
public class Task {
    
    @Id
    @Column(name="id_task")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int idTask;
    
    private String name;
    private String description;
    
    @Column(name="id_course")
    private int idCourse;
    
    public int getIdTask() {
        return idTask;
    }
    
    public void setIdTask(int idTask) {
        this.idTask = idTask;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public int getIdCourse() {
        return idCourse;
    }
    
    public void setIdCourse(int idCourse) {
        this.idCourse = idCourse;
    }
}
