import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  
  private route = inject(ActivatedRoute);

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);

  inventoryId = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
    });
  }

  submitted = false;

  productForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    imageUrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    price: ['',[ Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
    stock: ['', [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.valid) {
      this.productService.addProduct({
        code: this.productForm.value.code!,
        name: this.productForm.value.name!,
        category: 'cati',
        imageUrl: this.productForm.value.imageUrl!,
        price: parseFloat(this.productForm.value.price!),
        stock: parseFloat(this.productForm.value.stock!)
      }, this.inventoryId).subscribe({
        next: () => console.log('Producto agregado'),
        error: (err) => console.log('Error al agregar product', err)
      });
    }
  }

  clearSubmitted(): void {
    this.submitted = false;
  }
}
