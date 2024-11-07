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

import java.util.*;

@Controller
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<Map<String,String>> addInventory(@RequestBody PostInventoryRequest postInventoryRequest) {
        System.out.println(postInventoryRequest);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        Optional<UserInventoryRole> userInventoryRoleOptional =
                        inventoryService.createInventoryAndLinkUser(email,postInventoryRequest.name(), RoleName.ADMIN);
        if(userInventoryRoleOptional.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Inventario creado exitosamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Error al registrar el inventario");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getInventoriesOfUser(){
        try{
            String email = AuthUtils.getEmailOfAuthenticatedUser(SecurityContextHolder.getContext());
            //Obtenemos los inventarios del servicio
            List<Inventory> inventories = inventoryService.getInventoriesOfUserByEmail(email);
            return ResponseEntity.ok(inventories);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    public record PostInventoryRequest(String name) {
    }
}
