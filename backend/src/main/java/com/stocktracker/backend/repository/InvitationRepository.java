package com.stocktracker.backend.repository;

import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    @Query("SELECT i FROM Invitation i WHERE i.from.email = :email")
    List<Invitation> findInvitationsByUserEmail(@Param("email") String email);
}
