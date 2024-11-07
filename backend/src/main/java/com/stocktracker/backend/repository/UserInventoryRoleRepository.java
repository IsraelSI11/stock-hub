package com.stocktracker.backend.repository;

import com.stocktracker.backend.model.UserInventoryRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserInventoryRoleRepository extends JpaRepository<UserInventoryRole, UUID> {
}
