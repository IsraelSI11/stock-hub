package com.stocktracker.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class User extends BaseEntity{

    private String username;

    @Column(unique=true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "user")
    private Set<UserInventoryRole> userInventoryRoles = new HashSet<>();
}
