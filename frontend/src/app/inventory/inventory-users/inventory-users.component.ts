import { Component, inject, OnInit, signal } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { UserInventoryRole } from '../../shared/interfaces/userInventoryRole.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserPermissionsData, UserPermissionsDialogComponent } from '../user-permissions-dialog/user-permissions-dialog.component';
import { UserDeleteData, UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-inventory-users',
  standalone: true,
  imports: [MatIcon, MatButton],
  providers: [InventoryService],
  templateUrl: './inventory-users.component.html',
  styleUrl: './inventory-users.component.css'
})
export class InventoryUsersComponent implements OnInit{

  private inventoryService = inject(InventoryService);
  private route = inject(ActivatedRoute);

  inventoryId = '';
  inventoryUsers = signal<UserInventoryRole[]>([]);

  constructor(private dialog: MatDialog) {}
  
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

  changePermissions(userInventoryRole: UserInventoryRole): void {
    const dialogRef = this.dialog.open(UserPermissionsDialogComponent, {
      data: {
        user: userInventoryRole.user,
        inventoryId: this.inventoryId,
        currentRole: userInventoryRole.roleName,
      } as UserPermissionsData,
    });
  
    dialogRef.afterClosed().subscribe(newRole => {
      if (newRole) {
        console.log(`Cambiando permisos de ${userInventoryRole.user.email} a ${newRole}`);
        window.location.reload();
      }
    });
  }
  
  deleteUser(userInventoryRole: UserInventoryRole): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: {
        user: userInventoryRole.user,
        inventoryId: this.inventoryId,
      } as UserDeleteData,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Eliminando usuario: ${userInventoryRole.user.email}`);
        window.location.reload();
      }
    });
  }
}
