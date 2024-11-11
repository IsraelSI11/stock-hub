package com.stocktracker.backend.dto;

import com.stocktracker.backend.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class InvitationDto {
    private AppUserDto from;
    private AppUserDto to;
    private RoleName role;
    private InventoryDto inventory;
}
