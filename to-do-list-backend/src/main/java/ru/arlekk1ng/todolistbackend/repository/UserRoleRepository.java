package ru.arlekk1ng.todolistbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arlekk1ng.todolistbackend.entity.user.role.UserRole;
import ru.arlekk1ng.todolistbackend.entity.user.role.UserRoleEnum;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    Optional<UserRole> findByName(UserRoleEnum userRoleEnum);
}
