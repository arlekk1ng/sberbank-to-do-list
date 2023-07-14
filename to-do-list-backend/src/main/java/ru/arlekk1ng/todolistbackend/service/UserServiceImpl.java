package ru.arlekk1ng.todolistbackend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;
import ru.arlekk1ng.todolistbackend.entity.user.User;
import ru.arlekk1ng.todolistbackend.repository.CategoryRepository;
import ru.arlekk1ng.todolistbackend.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    // --- задачи категории ---

    @Override
    public List<Task> getCategoryTasks(Long categoryId) {
        Category category = getCategory(categoryId);
        return category.getTasks();
    }

    @Override
    public boolean addCategoryTask(Long categoryId, Task task) {
        Category category = getCategory(categoryId);

        task.setCreationDate(LocalDate.now());
        task.setState(TaskStateEnum.NOT_COMPLETED);

        category.getTasks().add(task);
        categoryRepository.save(category);

        return true;
    }

    private Category getCategory(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isEmpty()) {
            throw new RuntimeException("Категория по id = " + categoryId + " не найдена");
        }

        return categoryOptional.get();
    }

    // --- категории ---

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
