package ru.arlekk1ng.todolistbackend.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arlekk1ng.todolistbackend.entity.user.User;
import ru.arlekk1ng.todolistbackend.memory.MemoryImpl;
import ru.arlekk1ng.todolistbackend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final MemoryImpl memoryImpl;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository, MemoryImpl memoryImpl) {
        this.userRepository = userRepository;
        this.memoryImpl = memoryImpl;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с логином : "
                        + username + " не найден"));

        memoryImpl.setUserId(user.getId());

        return UserDetailsImpl.build(user);
    }

}
