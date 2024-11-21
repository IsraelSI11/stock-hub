package com.stocktracker.backend.dto;


import com.stocktracker.backend.model.UserInventoryRole;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AppUserDto {

    private UUID id;

    private String username;

    private String email;
}
