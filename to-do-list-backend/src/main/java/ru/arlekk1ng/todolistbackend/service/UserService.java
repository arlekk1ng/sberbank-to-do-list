package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.category.Category;

import java.util.List;

public interface UserService {

    List<Category> getCategories(Long userId);
    Category addCategory(Long userId, Category category);
}
