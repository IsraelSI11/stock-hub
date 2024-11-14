package com.stocktracker.backend.repository;

import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.UserInventoryRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserInventoryRoleRepository extends JpaRepository<UserInventoryRole, UUID> {

    @Query("SELECT uir.inventory FROM UserInventoryRole uir WHERE uir.user.email = :email")
    List<Inventory> findInventoriesByUserEmail(@Param("email") String email);

    List<UserInventoryRole> findByInventoryId(UUID inventoryId);
}
