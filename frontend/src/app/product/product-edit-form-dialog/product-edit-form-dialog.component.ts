import { Component, Inject, inject, model } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product/product.service';

export interface ProductEditData {
  inventoryId: string;
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

@Component({
  selector: 'app-product-edit-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  providers: [ProductService],
  templateUrl: './product-edit-form-dialog.component.html',
  styleUrls: ['./product-edit-form-dialog.component.css']
})
export class ProductEditFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProductEditFormDialogComponent>);
  readonly data = inject<ProductEditData>(MAT_DIALOG_DATA);
  readonly form: FormGroup;

  private productService = inject(ProductService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      code: [this.data.code, Validators.required],
      name: [this.data.name, [Validators.required, Validators.minLength(2)]],
      category: [this.data.category, Validators.required],
      stock: [this.data.stock, [Validators.required, Validators.min(0)]],
      price: [this.data.price, [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.productService.updateProduct(this.data.inventoryId,{
        id: this.data.id,
        code: this.form.value.code,
        name: this.form.value.name,
        category: this.form.value.category,
        imageUrl: '',
        stock: this.form.value.stock,
        price: this.form.value.price,
      }).subscribe(() => this.dialogRef.close(this.form.value));
    }
  }
}
