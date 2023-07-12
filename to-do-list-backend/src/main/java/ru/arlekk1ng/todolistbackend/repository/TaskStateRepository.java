package ru.arlekk1ng.todolistbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arlekk1ng.todolistbackend.entity.task.TaskState;
import ru.arlekk1ng.todolistbackend.entity.task.enumeration.TaskStateEnum;

import java.util.Optional;

@Repository
public interface TaskStateRepository extends JpaRepository<TaskState, Long> {

    Optional<TaskState> findByName(TaskStateEnum name);
}
