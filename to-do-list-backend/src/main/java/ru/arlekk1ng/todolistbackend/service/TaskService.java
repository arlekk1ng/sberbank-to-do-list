package ru.arlekk1ng.todolistbackend.service;

import ru.arlekk1ng.todolistbackend.entity.task.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> getAllUserTasks(long userId);
    Optional<Task> getTask(long taskId);
    Task addTask(Task task);
    void deleteTask(long taskId);
    Task updateTask(Task task);
}
