package com.stocktracker.backend.repository;

import com.stocktracker.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByInventoryId(UUID inventoryId);
    @Query("SELECT c FROM Category c WHERE c.inventory.id = :inventoryId AND c.name = :name")
    Optional<Category> findByNameAndInventoryId(@Param("name") String name,@Param("inventoryId") UUID inventoryId);
}
