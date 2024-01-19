package com.krkm.lms.SpaceStudyServer.auth;

public class RegisterRequest {
    
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String contact;
    private String password;
    private String serial_key;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSurname() {
        return surname;
    }
    
    public void setSurname(String surname) {
        this.surname = surname;
    }
    
    public String getPatronymic() {
        return patronymic;
    }
    
    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getContact() {
        return contact;
    }
    
    public void setContact(String contact) {
        this.contact = contact;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getSerial_key() {
        return serial_key;
    }
    
    public void setSerial_key(String serial_key) {
        this.serial_key = serial_key;
    }

}
