package ru.arlekk1ng.todolistbackend.entity.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.arlekk1ng.todolistbackend.entity.user.User;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Column
    private String name;

    @NotNull
    @ManyToOne
    @JsonIgnore
    private User user;
}
