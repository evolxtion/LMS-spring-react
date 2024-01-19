package com.krkm.lms.SpaceStudyServer.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Courses")
public class Course {
    
    @Id
    @Column(name="id_course")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idCourse;
    private String name;
    private String description;
    
    @Column(name="date_start")
    private String dateStart;
    
    @Column(name="date_end")
    private String dateEnd;
    
    @Column(name="teacher_id")
    private int teacherId;
    
    public int getIdCourse() {
        return idCourse;
    }
    
    public void setIdCourse(int idCourse) {
        this.idCourse = idCourse;
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
    
    public String getDateStart() {
        return dateStart;
    }
    
    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }
    
    public String getDateEnd() {
        return dateEnd;
    }
    
    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }
    
    public int getTeacherId() {
        return teacherId;
    }
    
    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }
}
