package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.model.Category;

public class CategoryMapper {

    public static CategoryDto CategoryToDto(Category category) {
        InventoryDto inventoryDto = InventoryMapper.InventoryToDto(category.getInventory());

        return new CategoryDto(category.getName());
    }

    public static Category DtoToCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());

        return category;
    }


}
