package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.mapper.CategoryMapper;
import com.stocktracker.backend.model.Category;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.repository.CategoryRepository;
import com.stocktracker.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    private InventoryRepository inventoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, InventoryRepository inventoryRepository) {
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Optional<Category> addCategory(String name, UUID inventoryId) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        if(inventory.isPresent()) {
            Category category = new Category(name, inventory.get());
            return Optional.of(categoryRepository.save(category));
        }
        return Optional.empty();
    }

    public List<CategoryDto> getCategoriesByInventory(UUID inventoryId){
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        if(inventory.isPresent()) {
            List<Category> categories = categoryRepository.findByInventoryId(inventoryId);
            List<CategoryDto> categoryDtos = CategoryMapper.CategoriesToDtos(categories);
            return categoryDtos;
        }
        return null;
    }
}
