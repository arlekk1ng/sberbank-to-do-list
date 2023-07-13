package ru.arlekk1ng.todolistbackend.entity.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.arlekk1ng.todolistbackend.entity.category.Category;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskPriorityEnum;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskRepetitionRateEnum;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Column
    private String name;
    @Column
    private String description;
    @NotNull
    @Column
    private LocalDate creationDate;
    @Column
    private LocalDate completionDate;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column
    private TaskStateEnum state;
    @Enumerated(EnumType.STRING)
    @Column
    private TaskPriorityEnum priority;
    @Enumerated(EnumType.STRING)
    @Column
    private TaskRepetitionRateEnum repetitionRate;

    @NotNull
    @ManyToOne
    private Category category;
}
