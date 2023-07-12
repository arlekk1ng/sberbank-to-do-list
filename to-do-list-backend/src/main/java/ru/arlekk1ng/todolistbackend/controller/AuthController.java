package ru.arlekk1ng.todolistbackend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.arlekk1ng.todolistbackend.entity.user.User;
import ru.arlekk1ng.todolistbackend.entity.user.request.LoginRequest;
import ru.arlekk1ng.todolistbackend.entity.user.request.SignupRequest;
import ru.arlekk1ng.todolistbackend.entity.user.response.JwtResponse;
import ru.arlekk1ng.todolistbackend.entity.user.response.MessageResponse;
import ru.arlekk1ng.todolistbackend.entity.user.role.UserRole;
import ru.arlekk1ng.todolistbackend.entity.user.role.UserRoleEnum;
import ru.arlekk1ng.todolistbackend.repository.UserRepository;
import ru.arlekk1ng.todolistbackend.repository.UserRoleRepository;
import ru.arlekk1ng.todolistbackend.security.jwt.JwtUtils;
import ru.arlekk1ng.todolistbackend.security.service.UserDetailsImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            PasswordEncoder encoder,
            JwtUtils jwtUtils
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> userRoles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        JwtResponse body = new JwtResponse(
                jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), userRoles);

        return ResponseEntity.ok(body);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Пользователь уже существует"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email уже используется"));
        }

        // Создаем нового пользователя
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        Set<String> strUserRoles = signUpRequest.getUserRoles();
        Set<UserRole> userRoles = new HashSet<>();

        if (strUserRoles == null) {
            UserRole userRole = userRoleRepository.findByName(UserRoleEnum.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Роль не найдена"));
            userRoles.add(userRole);
        } else {
            strUserRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        UserRole adminRole = userRoleRepository.findByName(UserRoleEnum.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Роль не найдена"));
                        userRoles.add(adminRole);

                        break;
                    default:
                        UserRole userRole = userRoleRepository.findByName(UserRoleEnum.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Роль не найдена"));
                        userRoles.add(userRole);
                }
            });
        }

        user.setUserRoles(userRoles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Пользователь успешно зарегистрирован"));
    }
}
