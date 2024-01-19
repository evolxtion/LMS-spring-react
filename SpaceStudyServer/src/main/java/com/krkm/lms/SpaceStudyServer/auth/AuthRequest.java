package com.krkm.lms.SpaceStudyServer.auth;

public class AuthRequest {
    
    private int userId;
    private String hashToken;
    
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public String getHashToken() {
        return hashToken;
    }
    
    public void setHashToken(String hashToken) {
        this.hashToken = hashToken;
    }
}
