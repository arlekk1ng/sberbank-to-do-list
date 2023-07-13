package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.task.Task;

import java.util.List;

public interface TaskService {

    List<Task> getAllByCategoryId(Long categoryId);
    Task create(Task task);
    boolean delete(Long taskId);
    boolean update(Task task);
}
