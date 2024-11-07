package com.stocktracker.backend.service;

import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.Product;
import com.stocktracker.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> addProduct(Product product) {
        return Optional.of(productRepository.save(product));
    }

    public Optional<Product> getProduct(UUID id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByInventory(UUID inventoryId) {
        return productRepository.findByInventoryId(inventoryId);
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
