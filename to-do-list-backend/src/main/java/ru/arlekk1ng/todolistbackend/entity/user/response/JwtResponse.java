package ru.arlekk1ng.todolistbackend.entity.user.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> userRoles;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> userRoles) {
        this.accessToken = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.userRoles = userRoles;
    }
}
