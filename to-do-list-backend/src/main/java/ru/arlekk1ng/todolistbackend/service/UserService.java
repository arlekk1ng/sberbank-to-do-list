package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;

import java.util.List;

public interface UserService {

    List<Category> getCategories(Long userId);
    boolean addCategory(Long userId, CategoryDTO categoryDTO);
}
