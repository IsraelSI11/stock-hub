package com.stocktracker.backend.service;

import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.mapper.ProductMapper;
import com.stocktracker.backend.model.Category;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.Product;
import com.stocktracker.backend.repository.CategoryRepository;
import com.stocktracker.backend.repository.InventoryRepository;
import com.stocktracker.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final InventoryRepository inventoryRepository;

    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,
                                    InventoryRepository inventoryRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.categoryRepository = categoryRepository;
    }

    public Optional<Product> addProduct(String code, String name, String imageUrl
                                            , String category, int stock, double price, UUID inventoryId) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(inventoryId);
        System.out.println(inventoryOptional.isPresent());
        if(inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();
            Optional<Category> optCategory = categoryRepository.findByNameAndInventoryId(category, inventoryId);
            if(optCategory.isPresent()) {
                Product product = new Product(code, name, imageUrl, inventory, optCategory.get(), stock, price);
                return Optional.of(productRepository.save(product));
            }
        }
        return Optional.empty();
    }

    public Optional<Product> getProduct(UUID id) {
        return productRepository.findById(id);
    }

    public List<ProductDto> getProductsByInventory(UUID inventoryId) {
        return ProductMapper.ProductListToDtoList(productRepository.findByInventoryId(inventoryId));
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

    public Optional<Product> updateProduct(UUID id, Product product) {
        Optional<Product> oldProduct = productRepository.findById(id);
        if (oldProduct.isPresent()) {
            Product oldProductObj = oldProduct.get();
            oldProductObj.setName(product.getName());
            oldProductObj.setCode(product.getCode());
            oldProductObj.setStock(product.getStock());
            oldProductObj.setPrice(product.getPrice());
            oldProductObj.setCategory(product.getCategory());
            return Optional.of(productRepository.save(oldProductObj));
        }
        return Optional.empty();
    }
}
