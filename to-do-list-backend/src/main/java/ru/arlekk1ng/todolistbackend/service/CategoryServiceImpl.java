package ru.arlekk1ng.todolistbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllByUserId(Long userId) {
        return categoryRepository.findAllByUserId(userId);
    }

    @Override
    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public boolean delete(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return true;
    }

    @Override
    public boolean update(Category category) {
        if (categoryRepository.existsById(category.getId())) {
            categoryRepository.save(category);
            return true;
        }

        return false;
    }
}
