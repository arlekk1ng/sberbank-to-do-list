package ru.arlekk1ng.todolistbackend.entity.task;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;

import java.util.Arrays;
import java.util.Optional;

@Entity
@Table(name = "task_states")
@Data
public class TaskState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(value = EnumType.STRING)
    @Column
    private TaskStateEnum name;
}
