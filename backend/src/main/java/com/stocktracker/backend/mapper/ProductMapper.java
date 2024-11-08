package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.model.Product;

public class ProductMapper {

    public static ProductDto ProductToDto(Product product) {
        InventoryDto inventoryDto = InventoryMapper.InventoryToDto(product.getInventory());
        CategoryDto categoryDto = CategoryMapper.CategoryToDto(product.getCategory());

        return new ProductDto(product.getCode(), product.getName(), product.getImageUrl(),
                                    categoryDto, product.getStock(), product.getPrice());
    }

    public static Product DtoToProduct(ProductDto productDto) {
        Product product = new Product();
        product.setCode(productDto.getCode());
        product.setName(productDto.getName());
        product.setImageUrl(productDto.getImageUrl());
        product.setStock(productDto.getStock());
        product.setPrice(productDto.getPrice());

        product.setCategory(CategoryMapper.DtoToCategory(productDto.getCategory()));

        return product;
    }
}
