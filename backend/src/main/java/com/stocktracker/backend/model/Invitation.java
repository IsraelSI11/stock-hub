package com.stocktracker.backend.model;

import com.stocktracker.backend.enums.RoleName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Invitation extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "fromUser", nullable = false)
    private AppUser fromUser;

    @ManyToOne
    @JoinColumn(name = "toUser", nullable = false)
    private AppUser toUser;

    @ManyToOne
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @Enumerated(EnumType.STRING)
    private RoleName roleName;
}
