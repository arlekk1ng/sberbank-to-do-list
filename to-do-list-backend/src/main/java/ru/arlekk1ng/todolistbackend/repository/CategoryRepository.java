package ru.arlekk1ng.todolistbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arlekk1ng.todolistbackend.entity.category.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
