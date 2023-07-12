package ru.arlekk1ng.todolistbackend.entity.task;

import jakarta.persistence.*;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskRepetitionRateEnum;

@Entity
@Table(name = "task_repetition_rates")
public class TaskRepetitionRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(value = EnumType.STRING)
    @Column
    private TaskRepetitionRateEnum name;
}
