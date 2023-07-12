package ru.arlekk1ng.todolistbackend.entity.task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskDTO {
    private long id;
    private String name;
    private String description;
    private String state;
}
