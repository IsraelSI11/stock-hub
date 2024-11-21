import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserInventoryService } from '../../services/userinventory/user-inventory.service';
import { User } from '../../shared/interfaces/user.interface';

export interface UserDeleteData {
  user:User;
  inventoryId: string;
}

@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule],
  providers: [UserInventoryService],
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css'],
})
export class UserDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserDeleteDialogComponent>);
  readonly data = inject<UserDeleteData>(MAT_DIALOG_DATA);

  private userInventoryService = inject(UserInventoryService);

  confirmDelete(): void {
    this.userInventoryService.deleteUserFromInventory(this.data.user.id,this.data.inventoryId).subscribe({
      next: () => {
        this.dialogRef.close(true); // Confirma la eliminación
      },
      error: (err) => {
        console.log('Error al eliminar usuario', err);
        this.dialogRef.close(false); // Cancela la eliminación
      }
    });
  }

  cancelDelete(): void {
    this.dialogRef.close(false); // Cancela la eliminación
  }
}
