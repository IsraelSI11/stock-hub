package com.stocktracker.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inventory extends BaseEntity{

    private String name;

    @OneToMany(mappedBy = "inventory", fetch = FetchType.LAZY)
    private Set<UserInventoryRole> userInventoryRoles = new HashSet<>();

    @OneToMany(mappedBy = "inventory")
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "inventory")
    private Set<Category> categories = new HashSet<>();

    public Inventory(String name){
        this.name = name;
    }
}
