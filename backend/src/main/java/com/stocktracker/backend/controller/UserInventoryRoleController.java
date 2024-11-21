package com.stocktracker.backend.controller;

import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.service.UserInventoryRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    //Hacer endpoints para actualizar y eliminar

    @PutMapping("/{inventoryId}/{userId}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> updatePermissionsOfUser(
                                                            @PathVariable(value = "inventoryId") UUID inventoryId,
                                                            @PathVariable(value = "userId") UUID userId,
                                                            @RequestBody UpdatePermissionsRequest updatePermissionsRequest) {

        try{
            Optional<UserInventoryRoleDto> optionalUserInventoryRole =
                    userInventoryRoleService.updatePermissionsOfUser(inventoryId,userId,updatePermissionsRequest.roleName());
            Map<String, String> response = new HashMap<>();
            if(optionalUserInventoryRole.isPresent()){
                response.put("message", "Permisos actualizados correctamente");
                return ResponseEntity.ok().body(response);
            }else{
                response.put("message", "No se han podido modificar los persmisos del usuario");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            Map<String, String> response = new HashMap<>();
            response.put("message", "Ha ocurrido un error, no se ha podido modificar el permiso");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{inventoryId}/{userId}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteInventoryUser(
            @PathVariable(value = "inventoryId") UUID inventoryId,
            @PathVariable(value = "userId") UUID userId) {
        try{
            userInventoryRoleService.deleteUserInventoryRole(inventoryId,userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario-inventario eliminado correctamente");
            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            System.out.print(e);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Ha ocurrido un error, no se ha podido eliminar el usuario-inventario");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public record UpdatePermissionsRequest(RoleName roleName) {}

}
