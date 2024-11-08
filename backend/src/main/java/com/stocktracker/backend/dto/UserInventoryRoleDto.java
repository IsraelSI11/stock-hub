package com.stocktracker.backend.dto;

import com.stocktracker.backend.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserInventoryRoleDto {

    private RoleName roleName;

    private AppUserDto user;

    private InventoryDto inventory;
}
