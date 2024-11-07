package com.stocktracker.backend.controller;

import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.service.InventoryService;
import com.stocktracker.backend.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/")
    public ResponseEntity<String> addInventory(@RequestBody PostInventoryRequest postInventoryRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();

        Optional<UserInventoryRole> userInventoryRoleOptional =
                        inventoryService.createInventoryAndLinkUser(email,postInventoryRequest.name(), RoleName.ADMIN);
        if(userInventoryRoleOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Inventario creado exitosamente");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar el usuario");
    }

    @GetMapping("/")
    public ResponseEntity<List<Inventory>> getInventoriesOfUser(){
        try{
            String email = AuthUtils.getEmailOfAuthenticatedUser(SecurityContextHolder.getContext());
            if(email != null){
                //Obtenemos los inventarios del servicio
                List<Inventory> inventories = inventoryService.getInventoriesOfUserByEmail(email);
                return ResponseEntity.ok(inventories);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(List.of());
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    public record PostInventoryRequest(String name) {
    }
}
