package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.mapper.UserInventoryRoleMapper;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.repository.UserInventoryRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserInventoryRoleService {

    private UserInventoryRoleRepository userInventoryRoleRepository;

    @Autowired
    public UserInventoryRoleService(UserInventoryRoleRepository userInventoryRoleRepository) {
        this.userInventoryRoleRepository = userInventoryRoleRepository;
    }

    public List<UserInventoryRoleDto> getUsersfInventory(UUID inventoryId){
        return UserInventoryRoleMapper.userInventoryRolesToDtos(userInventoryRoleRepository.findByInventoryId(inventoryId));
    }
}
