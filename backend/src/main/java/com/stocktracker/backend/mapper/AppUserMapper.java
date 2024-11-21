package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.AppUserDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.model.AppUser;

import java.util.Set;
import java.util.stream.Collectors;

public class AppUserMapper {
    public static AppUserDto AppUserToDto(AppUser appUser) {

        return new AppUserDto(appUser.getId(),appUser.getUsername(), appUser.getEmail());
    }

    public static AppUser DtoToAppUser(AppUserDto appUserDto) {
        AppUser appUser = new AppUser();
        appUser.setId(appUserDto.getId());
        appUser.setUsername(appUserDto.getUsername());
        appUser.setEmail(appUserDto.getEmail());

        return appUser;
    }
}
