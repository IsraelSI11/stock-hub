package com.stocktracker.backend.controller;

import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.InvitationDto;
import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.model.Invitation;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.service.InvitationService;
import com.stocktracker.backend.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/invitation")
public class InvitationController {

    private InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<InvitationDto>> getInvitationsOfUser(){
        try{
            String email = AuthUtils.getEmailOfAuthenticatedUser(SecurityContextHolder.getContext());
            //Obtenemos las invitaciones del servicio
            List<InvitationDto> invitations = invitationService.getInvitationsOfUser(email);
            return ResponseEntity.ok(invitations);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    @PostMapping
    public ResponseEntity<Map<String,String>> sendInvitation(@RequestBody PostInvitationRequest postInvitationRequest) {
        try{
            String emailFrom = AuthUtils.getEmailOfAuthenticatedUser(SecurityContextHolder.getContext());
            Optional<Invitation> invitationOptional = invitationService.sendInvitation(emailFrom,postInvitationRequest.to()
                                                            ,postInvitationRequest.inventoryId(),postInvitationRequest.role());
            Map<String, String> response = new HashMap<>();
            if(invitationOptional.isPresent()){
                response.put("message", "Inventario creado exitosamente");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }else{
                response.put("message", "Error al registrar el inventario");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error al registrar el inventario");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public record PostInvitationRequest(String to, UUID inventoryId, RoleName role){ }
}
