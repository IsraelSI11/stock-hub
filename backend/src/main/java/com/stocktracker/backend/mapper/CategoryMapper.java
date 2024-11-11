package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.model.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static CategoryDto CategoryToDto(Category category) {
        return new CategoryDto(category.getName());
    }

    public static Category DtoToCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());

        return category;
    }

    public static List<CategoryDto> CategoriesToDtos(List<Category> categories) {
        return categories.stream()
                .map(CategoryMapper::CategoryToDto)
                .collect(Collectors.toList());
    }

    public static List<Category> DtosToCategories(List<CategoryDto> categoryDtos) {
        return categoryDtos.stream()
                .map(CategoryMapper::DtoToCategory)
                .collect(Collectors.toList());
    }

}
