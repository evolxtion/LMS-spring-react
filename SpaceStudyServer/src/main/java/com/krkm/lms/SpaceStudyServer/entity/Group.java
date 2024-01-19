package com.krkm.lms.SpaceStudyServer.entity;

import jakarta.persistence.*;

@Entity
@Table(name="`Groups`")
public class Group {
    
    @Id
    @Column(name="id_group")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idGroup;
    private String name;
    private String speciality;
    @Column(name="serial_key")
    private String serialKey;
    
    public int getIdGroup() {
        return idGroup;
    }
    
    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpeciality() {
        return speciality;
    }
    
    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }
    
    public String getSerialKey() {
        return serialKey;
    }
    
    public void setSerialKey(String serialKey) {
        this.serialKey = serialKey;
    }
}
