package ru.arlekk1ng.todolistbackend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.user.User;
import ru.arlekk1ng.todolistbackend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<Category> getCategories(Long userId) {
        User user = getUser(userId);
        return user.getCategories();
    }

    @Override
    public Category addCategory(Long userId, Category category) {
        User user = getUser(userId);
        category.setUser(user);
        user.getCategories().add(category);
        userRepository.save(user);
        log.info("saved categoryId = {}", category.getId());
        return category;
    }

    private User getUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Пользователь с id = " + userId + " не найден");
        }

        return userOptional.get();
    }
}
