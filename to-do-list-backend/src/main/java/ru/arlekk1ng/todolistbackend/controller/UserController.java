package ru.arlekk1ng.todolistbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.memory.MemoryImpl;
import ru.arlekk1ng.todolistbackend.service.UserService;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    private final MemoryImpl memoryImpl;

    @Autowired
    public UserController(UserService userService, MemoryImpl memoryImpl) {
        this.userService = userService;
        this.memoryImpl = memoryImpl;
    }

    // --- задачи категории ---

    @GetMapping("/categories/{categoryId}/tasks")
    public List<Task> getCategoryTasks(@PathVariable Long categoryId) {
        return userService.getCategoryTasks(categoryId);
    }

    @PostMapping("/categories/{categoryId}/tasks")
    public boolean addCategoryTask(@PathVariable Long categoryId, @RequestBody Task task) {
        return userService.addCategoryTask(categoryId, task);
    }

    // --- категории ---

    @GetMapping("/categories")
    public List<CategoryDTO> getCategories() {
        List<Category> categories = userService.getCategories(memoryImpl.getUserId());
        List<CategoryDTO> categoryDTOList = categories.stream()
                .map(category -> new CategoryDTO(category.getId(), category.getName())).toList();
        return categoryDTOList;
    }

    @PostMapping("/categories")
    public boolean addCategory(@RequestBody CategoryDTO categoryDTO) {
        return userService.addCategory(memoryImpl.getUserId(), categoryDTO);
    }
}
