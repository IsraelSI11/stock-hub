package com.stocktracker.backend.mapper;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.model.Product;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDto ProductToDto(Product product) {
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

    public static List<ProductDto> ProductListToDtoList(List<Product> products) {
        return products.stream()
                .map(ProductMapper::ProductToDto)
                .collect(Collectors.toList());
    }

    public static List<Product> DtoListToProductList(List<ProductDto> productDtos) {
        return productDtos.stream()
                .map(ProductMapper::DtoToProduct)
                .collect(Collectors.toList());
    }
}
