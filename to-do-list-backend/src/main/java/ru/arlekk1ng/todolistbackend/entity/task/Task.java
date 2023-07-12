package ru.arlekk1ng.todolistbackend.entity.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.arlekk1ng.todolistbackend.entity.user.User;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
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

    @ManyToOne
    private TaskCategory category;
    @ManyToOne
    private TaskState state;
    @ManyToOne
    private TaskPriority priority;
    @ManyToOne
    private TaskRepetitionRate repetitionRate;

    @ManyToOne
    @JsonIgnore
    private User user;

    public Task(String name, String description, @NotNull LocalDate creationDate, TaskState state, User user) {
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.state = state;
        this.user = user;
    }
}
