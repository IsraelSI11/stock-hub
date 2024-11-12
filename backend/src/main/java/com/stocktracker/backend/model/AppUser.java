package com.stocktracker.backend.model;

import jakarta.persistence.*;
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
public class AppUser extends BaseEntity{

    private String username;

    @Column(unique=true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "user")
    private Set<UserInventoryRole> userInventoryRoles = new HashSet<>();

    @OneToMany(mappedBy = "fromUser")
    private Set<Invitation> invitationsSent = new HashSet<>();

    @OneToMany(mappedBy = "toUser")
    private Set<Invitation> invitationsReceived = new HashSet<>();

    public AppUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
