package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.AppUserDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.model.UserInventoryRole;

import java.util.List;
import java.util.stream.Collectors;

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

    public static List<UserInventoryRoleDto> userInventoryRolesToDtos(List<UserInventoryRole> userInventoryRoles) {
        // Mapeo de lista de UserInventoryRole a lista de UserInventoryRoleDto
        return userInventoryRoles.stream()
                .map(UserInventoryRoleMapper::UserInventoryRoleToDto)
                .collect(Collectors.toList());
    }

    public static List<UserInventoryRole> dtosToUserInventoryRoles(List<UserInventoryRoleDto> userInventoryRoleDtos) {
        // Mapeo de lista de UserInventoryRoleDto a lista de UserInventoryRole
        return userInventoryRoleDtos.stream()
                .map(UserInventoryRoleMapper::DtoToUserInventoryRole)
                .collect(Collectors.toList());
    }

}
