package com.stocktracker.backend.repository;

import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.UserInventoryRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserInventoryRoleRepository extends JpaRepository<UserInventoryRole, UUID> {

    @Query("SELECT uir.inventory FROM UserInventoryRole uir WHERE uir.user.email = :email")
    List<Inventory> findInventoriesByUserEmail(@Param("email") String email);

    @Query("SELECT uir FROM UserInventoryRole uir WHERE uir.user.id = :userId AND uir.inventory.id = :inventoryId")
    Optional<UserInventoryRole> findByInventoryIdAndUserId(@Param("inventoryId") UUID inventoryId, @Param("userId") UUID userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserInventoryRole uir WHERE uir.user.id = :userId AND uir.inventory.id = :inventoryId")
    void deleteByInventoryIdAndUserId(UUID inventoryId, UUID userId);

    @Query("SELECT uir FROM UserInventoryRole uir WHERE uir.inventory.id = :inventoryId AND uir.user.email <> :email")
    List<UserInventoryRole> findByInventoryId(@Param("inventoryId") UUID inventoryId, @Param("email") String email);
}
