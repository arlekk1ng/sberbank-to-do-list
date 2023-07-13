package ru.arlekk1ng.todolistbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arlekk1ng.todolistbackend.entity.user.role.Role;
import ru.arlekk1ng.todolistbackend.entity.user.role.RoleEnum;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleEnum roleEnum);
}
