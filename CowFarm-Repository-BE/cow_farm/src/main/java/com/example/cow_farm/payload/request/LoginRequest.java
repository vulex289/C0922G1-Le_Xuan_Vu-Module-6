package com.example.be.payload.request;
/**
 * Created by: Phạm Tiến
 * Date: 29/03/2023
 * Class: LoginRequest
 */
public class LoginRequest {

    private String username;
    private String password;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginRequest() {
    }

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
