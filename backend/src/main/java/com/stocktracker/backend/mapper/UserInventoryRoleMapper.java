package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.AppUserDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.model.UserInventoryRole;

public class UserInventoryRoleMapper {

    public static UserInventoryRoleDto UserInventoryRoleToDto(UserInventoryRole userInventoryRole) {
        AppUserDto userDto = AppUserMapper.AppUserToDto(userInventoryRole.getUser());
        InventoryDto inventoryDto = InventoryMapper.InventoryToDto(userInventoryRole.getInventory());

        return new UserInventoryRoleDto(userInventoryRole.getRoleName(), userDto, inventoryDto);
    }

    public static UserInventoryRole DtoToUserInventoryRole(UserInventoryRoleDto userInventoryRoleDto) {
        UserInventoryRole userInventoryRole = new UserInventoryRole();
        userInventoryRole.setRoleName(userInventoryRoleDto.getRoleName());

        userInventoryRole.setUser(AppUserMapper.DtoToAppUser(userInventoryRoleDto.getUser()));
        userInventoryRole.setInventory(InventoryMapper.DtoToInventory(userInventoryRoleDto.getInventory()));

        return userInventoryRole;
    }

}
