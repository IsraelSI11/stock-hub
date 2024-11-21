package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.mapper.UserInventoryRoleMapper;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.repository.UserInventoryRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserInventoryRoleService {

    private final UserInventoryRoleRepository userInventoryRoleRepository;

    @Autowired
    public UserInventoryRoleService(UserInventoryRoleRepository userInventoryRoleRepository) {
        this.userInventoryRoleRepository = userInventoryRoleRepository;
    }

    public List<UserInventoryRoleDto> getUsersfInventory(UUID inventoryId){
        return UserInventoryRoleMapper.userInventoryRolesToDtos(userInventoryRoleRepository.findByInventoryId(inventoryId));
    }

    public Optional<UserInventoryRoleDto> updatePermissionsOfUser(UUID inventoryId, UUID userId, RoleName roleName){
        Optional<UserInventoryRole> optionalUserInventoryRole =
                                            userInventoryRoleRepository.findByInventoryIdAndUserId(inventoryId,userId);
        if(optionalUserInventoryRole.isPresent()){
            UserInventoryRole userInventoryRole = optionalUserInventoryRole.get();
            userInventoryRole.setRoleName(roleName);
            return Optional.of(UserInventoryRoleMapper.UserInventoryRoleToDto(userInventoryRoleRepository.save(userInventoryRole)));
        }
        return Optional.empty();
    }

    public void deleteUserInventoryRole(UUID inventoryId, UUID userId){
        userInventoryRoleRepository.deleteByInventoryIdAndUserId(inventoryId,userId);
    }
}
