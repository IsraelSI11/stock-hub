import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ProductService } from '../../services/product/product.service';
import { MatButton } from '@angular/material/button';

export interface ProductDeleteData {
  productId: string;
  code: string;
}

@Component({
  selector: 'app-product-delete-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton],
  providers: [ProductService],
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css'],
})
export class ProductDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProductDeleteDialogComponent>);
  readonly data = inject<ProductDeleteData>(MAT_DIALOG_DATA);
  private productService = inject(ProductService);

  constructor(private dialog: MatDialog) { }

  deleteProduct(productId: string): void {
    console.log(productId)
    this.productService.deleteProduct(productId).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  confirmDelete(): void {
    this.deleteProduct(this.data.productId);
  }

  cancelDelete(): void {
    this.dialogRef.close(false); // Cancela la eliminación
  }
}
