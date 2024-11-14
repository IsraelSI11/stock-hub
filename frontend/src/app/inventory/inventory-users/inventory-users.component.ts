import { Component, inject, OnInit, signal } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { UserInventoryRole } from '../../shared/interfaces/userInventoryRole.interface';

@Component({
  selector: 'app-inventory-users',
  standalone: true,
  imports: [],
  providers: [InventoryService],
  templateUrl: './inventory-users.component.html',
  styleUrl: './inventory-users.component.css'
})
export class InventoryUsersComponent implements OnInit{

  private inventoryService = inject(InventoryService);
  private route = inject(ActivatedRoute);

  inventoryId = '';
  inventoryUsers = signal<UserInventoryRole[]>([]);
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
    });

    this.inventoryService.getUsersOfInventory(this.inventoryId).subscribe({
      next: (users) => {
        console.log('Usuarios del inventario', users)
        this.inventoryUsers.set(users);
      },
      error: (err) => console.log('Error al obtener usuarios del inventario', err)
    });
  }
}
