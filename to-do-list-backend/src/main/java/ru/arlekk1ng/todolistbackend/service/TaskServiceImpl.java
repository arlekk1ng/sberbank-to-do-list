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
    public List<Task> getAllByCategoryId(Long categoryId) {
        return taskRepository.findAllByCategoryId(categoryId);
    }

    @Override
    public Task create(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public boolean delete(Long taskId) {
        taskRepository.deleteById(taskId);
        return true;
    }

    @Override
    public boolean update(Task task) {
        if (taskRepository.existsById(task.getId())) {
            taskRepository.save(task);
            return true;
        }

        return false;
    }
}
