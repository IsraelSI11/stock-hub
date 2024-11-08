package com.stocktracker.backend.dto;

import com.stocktracker.backend.model.Category;
import com.stocktracker.backend.model.Product;
import com.stocktracker.backend.model.UserInventoryRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class InventoryDto {

    private UUID id;
    private String name;
    private Set<ProductDto> products = new HashSet<>();
    private Set<CategoryDto> categories = new HashSet<>();
}
