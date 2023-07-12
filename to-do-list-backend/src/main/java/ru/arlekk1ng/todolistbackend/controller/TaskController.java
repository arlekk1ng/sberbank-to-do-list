package ru.arlekk1ng.todolistbackend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.entity.task.TaskState;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;
import ru.arlekk1ng.todolistbackend.entity.task.dto.TaskDTO;
import ru.arlekk1ng.todolistbackend.entity.user.User;
import ru.arlekk1ng.todolistbackend.repository.TaskStateRepository;
import ru.arlekk1ng.todolistbackend.repository.UserRepository;
import ru.arlekk1ng.todolistbackend.security.service.UserDetailsImpl;
import ru.arlekk1ng.todolistbackend.service.TaskService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("tasks")
@Slf4j
public class TaskController {
    private final TaskService taskService;
    private final UserRepository userRepository;
    private final TaskStateRepository taskStateRepository;

    @Autowired
    public TaskController(TaskService taskService, UserRepository userRepository, TaskStateRepository taskStateRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
        this.taskStateRepository = taskStateRepository;
    }

    @GetMapping
    public List<TaskDTO> getAllUserTasks() {
        Optional<User> userOptional = getUser();
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();

        List<Task> tasks = taskService.getAllUserTasks(user.getId());
        List<TaskDTO> tasksDTO = tasks.stream()
                .map(task -> new TaskDTO(
                        task.getId(),
                        task.getName(),
                        task.getDescription(),
                        task.getState().getName().name()
                ))
                .toList();

        return getReverseList(tasksDTO);
    }

    @PostMapping
    public Task addTask(@RequestBody TaskDTO taskDTO) {
        Optional<User> userOptional = getUser();
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();

        Optional<TaskState> taskStateOptional
                = taskStateRepository.findByName(TaskStateEnum.NOT_COMPLETED);
        if (taskStateOptional.isEmpty()) {
            return null;
        }
        TaskState taskState = taskStateOptional.get();

        Task task = new Task(
                taskDTO.getName(), taskDTO.getDescription(), LocalDate.now(), taskState, user);

        return taskService.addTask(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable long taskId) {
        taskService.deleteTask(taskId);
    }

    /**
     * Обновление названия и описания задачи
     * @param taskId
     * @param taskDTO
     * @return
     */
    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable long taskId, @RequestBody TaskDTO taskDTO) {
        Optional<Task> taskOptional = taskService.getTask(taskId);
        if (taskOptional.isEmpty()) {
            return null;
        }
        Task task = taskOptional.get();

        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());

        return taskService.updateTask(task);
    }

    /**
     * Обновление состояния задачи
     * @param taskId
     * @param taskDTO
     * @return
     */
    @PatchMapping("/{taskId}")
    public Task updateTaskState(@PathVariable long taskId, @RequestBody TaskDTO taskDTO) {
        Optional<Task> taskOptional = taskService.getTask(taskId);
        if (taskOptional.isEmpty()) {
            return null;
        }
        Task task = taskOptional.get();

        Optional<TaskState> taskStateOptional;
        switch (taskDTO.getState()) {
            case "COMPLETED":
                taskStateOptional = taskStateRepository.findByName(TaskStateEnum.COMPLETED);
                if (taskStateOptional.isPresent()) {
                    task.setState(taskStateOptional.get());
                }
                break;
            case "NOT_COMPLETED":
                taskStateOptional = taskStateRepository.findByName(TaskStateEnum.NOT_COMPLETED);
                if (taskStateOptional.isPresent()) {
                    task.setState(taskStateOptional.get());
                }
                break;
        }

        return taskService.updateTask(task);
    }

    private <E> List<E> getReverseList(List<E> list) {
        List<E> reverse = new ArrayList<>(list.size());
        list.forEach(el -> reverse.add(0, el));
        return reverse;
    }

    private Optional<User> getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            Object principal = auth.getPrincipal();
            if (principal instanceof UserDetailsImpl userDetails) {
                return userRepository.findById(userDetails.getId());
            }
        }

        return Optional.empty();
    }
}
