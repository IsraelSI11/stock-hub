package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.InvitationDto;
import com.stocktracker.backend.enums.RoleName;
import com.stocktracker.backend.mapper.InventoryMapper;
import com.stocktracker.backend.mapper.InvitationMapper;
import com.stocktracker.backend.model.AppUser;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.Invitation;
import com.stocktracker.backend.model.UserInventoryRole;
import com.stocktracker.backend.repository.InventoryRepository;
import com.stocktracker.backend.repository.InvitationRepository;
import com.stocktracker.backend.repository.UserInventoryRoleRepository;
import com.stocktracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationService {

    private final UserRepository userRepository;
    private final InvitationRepository invitationRepository;
    private final UserInventoryRoleRepository userInventoryRoleRepository;
    private final InventoryRepository inventoryRepository;


    @Autowired
    public InvitationService(InvitationRepository invitationRepository
                            , UserInventoryRoleRepository userInventoryRoleRepository
                            , InventoryRepository inventoryRepository, UserRepository userRepository) {
        this.invitationRepository = invitationRepository;
        this.userInventoryRoleRepository = userInventoryRoleRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }
    //From y to son emails
    public Optional<Invitation> sendInvitation(String from, String to, UUID inventoryId, RoleName roleName) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(inventoryId);
        if(inventoryOptional.isPresent()) {
            Optional<AppUser> optionalFrom = userRepository.findByEmail(from);
            Optional<AppUser> optionalTo = userRepository.findByEmail(to);
            if(optionalFrom.isPresent() && optionalTo.isPresent()) {
                Invitation invitation  = new Invitation(optionalFrom.get(), optionalTo.get(), inventoryOptional.get(), roleName);
                return Optional.of(invitationRepository.save(invitation));
            }
        }
        return Optional.empty();
    }

    public List<InvitationDto> getInvitationsOfUser(String email){
        List<Invitation> invitations = invitationRepository.findInvitationsByUserEmail(email);
        return InvitationMapper.invitationsToDtos(invitations);
    }
}
