package com.krkm.lms.SpaceStudyServer.auth;

@Deprecated
public class AuthenticationResponse {
    private String token;
    
    public AuthenticationResponse(String token) {
        this.setToken(token);
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
}
