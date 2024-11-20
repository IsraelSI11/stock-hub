package com.stocktracker.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductDto {

    private UUID id;

    private String code;

    private String name;

    private String imageUrl;

    private CategoryDto category;

    private int stock = 0;

    private double price;
}
