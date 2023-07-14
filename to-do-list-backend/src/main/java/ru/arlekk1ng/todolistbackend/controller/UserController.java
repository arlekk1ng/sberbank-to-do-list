package ru.arlekk1ng.todolistbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.category.CategoryDTO;
import ru.arlekk1ng.todolistbackend.entity.task.Task;
import ru.arlekk1ng.todolistbackend.entity.task.TaskStateDTO;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;
import ru.arlekk1ng.todolistbackend.memory.MemoryImpl;
import ru.arlekk1ng.todolistbackend.service.UserService;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    private final MemoryImpl memoryImpl;

    @Autowired
    public UserController(UserService userService, MemoryImpl memoryImpl) {
        this.userService = userService;
        this.memoryImpl = memoryImpl;
    }

    // --- задачи ---

    @PatchMapping("/categories/{}/tasks/{taskId}")
    public boolean setTaskState(@PathVariable Long taskId, @RequestBody TaskStateDTO stateDTO) {
        TaskStateEnum state = "COMPLETED".equals(stateDTO.getValue())
                ? TaskStateEnum.COMPLETED
                : TaskStateEnum.NOT_COMPLETED;

        return userService.setTaskState(taskId, state);
    }

    @DeleteMapping("/categories/{}/tasks/{taskId}")
    public boolean deleteTask(@PathVariable Long taskId) {
        return userService.deleteTask(taskId);
    }

    @PutMapping("/categories/{}/tasks/{taskId}")
    public boolean updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return userService.updateTask(taskId, task);
    }

    // --- задачи категории ---

    @GetMapping("/categories/{categoryId}/tasks")
    public List<Task> getCategoryTasks(@PathVariable Long categoryId) {
        return userService.getCategoryTasks(categoryId);
    }

    @PostMapping("/categories/{categoryId}/tasks")
    public Task addCategoryTask(@PathVariable Long categoryId, @RequestBody Task task) {
        return userService.addCategoryTask(categoryId, task);
    }

    // --- категории ---

    @GetMapping("/categories")
    public List<CategoryDTO> getCategories() {
        List<Category> categories = userService.getCategories(memoryImpl.getUserId());
        List<CategoryDTO> categoryDTOList = categories.stream()
                .map(category -> new CategoryDTO(category.getId(), category.getName())).toList();
        return categoryDTOList;
    }

    @PostMapping("/categories")
    public boolean addCategory(@RequestBody CategoryDTO categoryDTO) {
        return userService.addCategory(memoryImpl.getUserId(), categoryDTO);
    }
}
