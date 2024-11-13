package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.mapper.InventoryMapper;
import com.stocktracker.backend.model.AppUser;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.repository.InventoryRepository;
import com.stocktracker.backend.repository.UserInventoryRoleRepository;
import com.stocktracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InventoryService {

    private final UserInventoryRoleRepository userInventoryRoleRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(UserInventoryRoleRepository userInventoryRoleRepository,
                            UserRepository userRepository,
                            InventoryRepository inventoryRepository) {
        this.userInventoryRoleRepository = userInventoryRoleRepository;
        this.userRepository = userRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Optional<UserInventoryRole> createInventoryAndLinkUser(String email, String inventoryName, RoleName roleName) {
        Inventory inventory = new Inventory(inventoryName);
        inventory = inventoryRepository.save(inventory);

        Optional<AppUser> optUser = userRepository.findByEmail(email);
        if (optUser.isPresent()) {
            UserInventoryRole userInventoryRole = new UserInventoryRole();
            userInventoryRole.setRoleName(roleName);
            userInventoryRole.setInventory(inventory);
            userInventoryRole.setUser(optUser.get());
            return Optional.of(userInventoryRoleRepository.save(userInventoryRole));
        }
        return Optional.empty();
    }

    public List<InventoryDto> getInventoriesOfUserByEmail(String email) {
        return InventoryMapper.InventoryListToDtoList(userInventoryRoleRepository.findInventoriesByUserEmail(email));
    }

    public InventoryDto getInventoryById(UUID inventoryId) {
        Optional<Inventory> optInventory = inventoryRepository.findById(inventoryId);
        return optInventory.map(InventoryMapper::InventoryToDto).orElse(null);
    }
}
