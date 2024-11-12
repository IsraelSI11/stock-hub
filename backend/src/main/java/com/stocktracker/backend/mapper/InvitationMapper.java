package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.AppUserDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.InvitationDto;
import com.stocktracker.backend.model.Invitation;

import java.util.List;
import java.util.stream.Collectors;

public class InvitationMapper {

    public static InvitationDto invitationToDto(Invitation invitation) {
        // Mapear los objetos internos de `Invitation` a sus respectivos DTOs
        AppUserDto fromDto = AppUserMapper.AppUserToDto(invitation.getFromUser());
        AppUserDto toDto = AppUserMapper.AppUserToDto(invitation.getToUser());
        InventoryDto inventoryDto = InventoryMapper.InventoryToDto(invitation.getInventory());

        // Retornar el `InvitationDto` con los datos mapeados
        return new InvitationDto(
                invitation.getId(),
                fromDto,
                toDto,
                invitation.getRoleName(),
                inventoryDto
        );
    }

    public static Invitation dtoToInvitation(InvitationDto invitationDto) {
        // Crear una instancia de `Invitation`
        Invitation invitation = new Invitation();

        // Mapear los DTOs internos a sus respectivas entidades
        invitation.setFromUser(AppUserMapper.DtoToAppUser(invitationDto.getFromUser()));
        invitation.setToUser(AppUserMapper.DtoToAppUser(invitationDto.getToUser()));
        invitation.setInventory(InventoryMapper.DtoToInventory(invitationDto.getInventory()));

        // Asignar el rol directamente
        invitation.setRoleName(invitationDto.getRole());

        // Retornar la entidad `Invitation` completa
        return invitation;
    }

    public static List<InvitationDto> invitationsToDtos(List<Invitation> invitations) {
        // Mapeo de lista de Invitation a lista de InvitationDto
        return invitations.stream()
                .map(InvitationMapper::invitationToDto)
                .collect(Collectors.toList());
    }

    public static List<Invitation> dtosToInvitations(List<InvitationDto> invitationDtos) {
        // Mapeo de lista de InvitationDto a lista de Invitation
        return invitationDtos.stream()
                .map(InvitationMapper::dtoToInvitation)
                .collect(Collectors.toList());
    }
}
