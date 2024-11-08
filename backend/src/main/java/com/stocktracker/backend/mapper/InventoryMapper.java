package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.dto.UserInventoryRoleDto;
import com.stocktracker.backend.model.Inventory;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class InventoryMapper {

    public static InventoryDto InventoryToDto(Inventory inventory) { 

        Set<ProductDto> productsDto = inventory.getProducts().stream()
                .map(ProductMapper::ProductToDto)
                .collect(Collectors.toSet());

        Set<CategoryDto> categoriesDto = inventory.getCategories().stream()
                .map(CategoryMapper::CategoryToDto)
                .collect(Collectors.toSet());

        return new InventoryDto(inventory.getId(), inventory.getName(), productsDto, categoriesDto);
    }

    public static Inventory DtoToInventory(InventoryDto inventoryDto) {
        Inventory inventory = new Inventory();
        inventory.setId(inventoryDto.getId());
        inventory.setName(inventoryDto.getName());

        inventory.setProducts(inventoryDto.getProducts().stream()
                .map(ProductMapper::DtoToProduct)
                .collect(Collectors.toSet()));

        inventory.setCategories(inventoryDto.getCategories().stream()
                .map(CategoryMapper::DtoToCategory)
                .collect(Collectors.toSet()));

        return inventory;
    }

    public static List<InventoryDto> InventoryListToDtoList(List<Inventory> inventories) {
        return inventories.stream()
                .map(InventoryMapper::InventoryToDto)
                .collect(Collectors.toList());
    }

    public static List<Inventory> DtoListToInventoryList(List<InventoryDto> inventoryDtos) {
        return inventoryDtos.stream()
                .map(InventoryMapper::DtoToInventory)
                .collect(Collectors.toList());
    }


}
