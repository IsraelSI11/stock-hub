package com.stocktracker.backend.controller;

import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.service.UserInventoryRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/inventory/user")
public class UserInventoryRoleController {

    private UserInventoryRoleService userInventoryRoleService;

    @Autowired
    public UserInventoryRoleController(UserInventoryRoleService userInventoryRoleService) {
        this.userInventoryRoleService = userInventoryRoleService;
    }

    @GetMapping("/{inventoryId}")
    @ResponseBody
    public ResponseEntity<List<UserInventoryRoleDto>> getUsersOfInventory(@PathVariable(value="inventoryId") UUID inventoryId){
        try{
            List<UserInventoryRoleDto> userInventoryRoleDtos = userInventoryRoleService.getUsersfInventory(inventoryId);
            return ResponseEntity.ok(userInventoryRoleDtos);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }
}
