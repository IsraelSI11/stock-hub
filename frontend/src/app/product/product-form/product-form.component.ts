import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryStateService } from '../../services/category/category-state.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  providers: [ProductService, CategoryStateService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);
  categoryStateService = inject(CategoryStateService);
  private productService = inject(ProductService);

  inventoryId = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
    });

    this.categoryStateService.loadCategoriesByInventoryId(this.inventoryId);
  }

  submitted = false;

  productForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    category:['', [Validators.required]],
    imageUrl: ['asdasdsaasd', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    price: ['',[ Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
    stock: ['', [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.valid) {
      this.productService.addProduct({
        code: this.productForm.value.code!,
        name: this.productForm.value.name!,
        category: this.productForm.value.category!,
        imageUrl: this.productForm.value.imageUrl!,
        price: parseFloat(this.productForm.value.price!),
        stock: parseFloat(this.productForm.value.stock!)
      }, this.inventoryId).subscribe({
        next: () => {
          this.router.navigate(['/inventory', this.inventoryId]);
        },
        error: (err) => console.log('Error al agregar product', err)
      });
    }
  }

  clearSubmitted(): void {
    this.submitted = false;
  }
}
