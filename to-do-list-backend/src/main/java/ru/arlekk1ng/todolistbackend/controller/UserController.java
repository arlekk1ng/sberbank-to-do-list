package ru.arlekk1ng.todolistbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
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

    // --- Категории ---

    @GetMapping("/categories")
    public List<CategoryDTO> getCategories() {
        List<Category> categories = userService.getCategories(memoryImpl.getUserId());
        List<CategoryDTO> categoryDTOList = categories.stream()
                .map(category -> new CategoryDTO(category.getId(), category.getName())).toList();
        return categoryDTOList;
    }

    @PostMapping("/categories")
    public CategoryDTO addCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = new Category(categoryDTO.getName());
        Category savedCategory = userService.addCategory(memoryImpl.getUserId(), category);
        return new CategoryDTO(savedCategory.getId(), savedCategory.getName());
    }
}
