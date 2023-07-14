package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;

import java.util.List;

public interface UserService {

    List<Category> getCategories(Long userId);
    boolean addCategory(Long userId, CategoryDTO categoryDTO);
    List<Task> getCategoryTasks(Long categoryId);
    Task addCategoryTask(Long categoryId, Task task);
    boolean setTaskState(Long taskId, TaskStateEnum state);
    boolean deleteTask(Long taskId);
    boolean updateTask(Long taskId, Task task);
}
