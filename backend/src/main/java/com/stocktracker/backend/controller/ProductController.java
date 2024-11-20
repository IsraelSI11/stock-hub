package com.stocktracker.backend.controller;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.InventoryDto;
import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.model.Category;
import com.stocktracker.backend.model.Inventory;
import com.stocktracker.backend.model.Product;
import com.stocktracker.backend.service.ProductService;
import com.stocktracker.backend.utils.AuthUtils;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{inventoryId}")
    @ResponseBody
    public ResponseEntity<List<ProductDto>>
                                    getProductsByInventory(@PathVariable(value="inventoryId") UUID inventoryId){
        try{
            List<ProductDto> products = productService.getProductsByInventory(inventoryId);
            return ResponseEntity.ok(products);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    @PostMapping("/{inventoryId}")
    @ResponseBody
    public ResponseEntity<Map<String,String>> createProduct(@RequestBody PostProductRequest productRequest
                                                    , @PathVariable(value="inventoryId") UUID inventoryId){
        try{
            System.out.println("-----asdasdassa------------");
            System.out.println(inventoryId);
            System.out.println(productRequest.code());
            Optional<Product> productOptional = productService.addProduct(productRequest.code(), productRequest.name(),
                                        productRequest.imageUrl(), productRequest.category(),
                                        productRequest.stock(), productRequest.price(), inventoryId);
            Map<String, String> response = new HashMap<>();
            if(productOptional.isPresent()){
                response.put("message", "Producto creado exitosamente");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }else{
                response.put("message", "Error al registrar el producto");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{inventoryId}/{productId}")
    @ResponseBody
    public ResponseEntity<Map<String,String>> modifyProduct(@RequestBody PostProductRequest productRequest,
            @PathVariable(value="inventoryId") UUID inventoryId
            , @PathVariable(value="productId") UUID productId){
        try{
            Optional<Product> productOptional = productService.updateProduct(productId,inventoryId,new ProductDto(productId, productRequest.code(), productRequest.name(),
                    productRequest.imageUrl(), new CategoryDto(productRequest.category()),
                    productRequest.stock(), productRequest.price()));
            Map<String, String> response = new HashMap<>();
            if(productOptional.isPresent()){
                response.put("message", "Producto modificado exitosamente");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }else{
                response.put("message", "Error al modificar el producto");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{productId}")
    @ResponseBody
    public ResponseEntity<Map<String,String>> deleteProduct(@PathVariable(value="productId") UUID productId){
        try{
            productService.deleteProduct(productId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Producto eliminado exitosamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public record PostProductRequest(String code, String name, String imageUrl, String category, int stock, double price) {
    }
}
