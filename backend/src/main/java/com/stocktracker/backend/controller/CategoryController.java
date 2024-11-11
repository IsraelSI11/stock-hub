package com.stocktracker.backend.controller;

import com.stocktracker.backend.dto.CategoryDto;
import com.stocktracker.backend.dto.ProductDto;
import com.stocktracker.backend.model.Category;
import com.stocktracker.backend.model.Product;
import com.stocktracker.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/{inventoryId}")
    @ResponseBody
    public ResponseEntity<Map<String,String>> createCategory(@RequestBody PostCategoryRequest categoryRequest
                                                            , @PathVariable(value="inventoryId") UUID inventoryId){
        try{
            Optional<Category> categoryOptional = categoryService.addCategory(categoryRequest.name(), inventoryId);
            Map<String, String> response = new HashMap<>();
            if(categoryOptional.isPresent()){
                response.put("message", "Categoría creado exitosamente");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }else{
                response.put("message", "Error al registrar la categoría");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{inventoryId}")
    @ResponseBody
    public ResponseEntity<List<CategoryDto>> getCategoriesByInventory(@PathVariable(value="inventoryId") UUID inventoryId){
        try{
            List<CategoryDto> categories = categoryService.getCategoriesByInventory(inventoryId);
            return ResponseEntity.ok(categories);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    public record PostCategoryRequest(String name) {
    }
}
