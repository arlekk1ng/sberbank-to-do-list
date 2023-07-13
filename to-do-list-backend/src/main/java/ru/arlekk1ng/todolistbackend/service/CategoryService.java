package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.category.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllByUserId(Long userId);
    Category create(Category category);
    boolean delete(Long categoryId);
    boolean update(Category category);
}
