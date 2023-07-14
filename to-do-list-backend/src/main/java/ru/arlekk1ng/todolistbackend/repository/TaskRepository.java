package ru.arlekk1ng.todolistbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arlekk1ng.todolistbackend.entity.task.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
