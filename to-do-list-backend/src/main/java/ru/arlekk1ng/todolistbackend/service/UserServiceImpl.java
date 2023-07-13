package ru.arlekk1ng.todolistbackend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
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
    public boolean addCategory(Long userId, CategoryDTO categoryDTO) {
        User user = getUser(userId);
        user.getCategories().add(new Category(categoryDTO.getName()));
        userRepository.save(user);
        return true;
    }

    private User getUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Пользователь с id = " + userId + " не найден");
        }

        return userOptional.get();
    }
}
