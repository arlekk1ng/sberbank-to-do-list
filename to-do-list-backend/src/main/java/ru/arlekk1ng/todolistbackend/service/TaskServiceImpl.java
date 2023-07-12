package ru.arlekk1ng.todolistbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllUserTasks(long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    @Override
    public Optional<Task> getTask(long taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(long taskId) {
        taskRepository.deleteById(taskId);
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }
}
