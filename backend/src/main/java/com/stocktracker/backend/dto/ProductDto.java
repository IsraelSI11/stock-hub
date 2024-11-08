package com.stocktracker.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductDto {

    private String code;

    private String name;

    private String imageUrl;

    private CategoryDto category;

    private int stock = 0;

    private double price;
}
