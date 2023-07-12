package ru.arlekk1ng.todolistbackend.entity.task;

import jakarta.persistence.*;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskPriorityEnum;

@Entity
@Table(name = "task_priorities")
public class TaskPriority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(value = EnumType.STRING)
    @Column
    private TaskPriorityEnum name;
}
