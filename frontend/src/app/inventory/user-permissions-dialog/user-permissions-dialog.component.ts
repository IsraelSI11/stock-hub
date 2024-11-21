import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RoleName } from '../../shared/enum/roleName';
import { User } from '../../shared/interfaces/user.interface';
import { UserInventoryService } from '../../services/userinventory/user-inventory.service';

export interface UserPermissionsData {
  user: User;
  inventoryId: string;
  currentRole: RoleName;
}

@Component({
  selector: 'app-user-permissions-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatSelectModule],
  templateUrl: './user-permissions-dialog.component.html',
  styleUrls: ['./user-permissions-dialog.component.css'],
})
export class UserPermissionsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserPermissionsDialogComponent>);
  readonly data = inject<UserPermissionsData>(MAT_DIALOG_DATA);
  newRole = this.data.currentRole;

  private userInventoryService = inject(UserInventoryService);

  savePermissions(): void {
    this.userInventoryService.updatePermissionsOfUser(this.data.user.id, this.data.inventoryId, this.newRole).subscribe({
      next: () => {
        this.dialogRef.close(this.newRole); // Confirma los permisos
      },
      error: (err) => {
        console.log('Error al actualizar permisos', err);
        this.dialogRef.close(null); // Cancela la actualización
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(null); // Cancela
  }
}
