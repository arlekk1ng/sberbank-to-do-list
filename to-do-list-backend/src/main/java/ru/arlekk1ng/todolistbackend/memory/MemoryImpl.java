package ru.arlekk1ng.todolistbackend.memory;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class MemoryImpl {
    private Long userId;
}
