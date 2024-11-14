import { Component, inject } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  submitted = false;

  inventoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.inventoryForm.valid) {
      this.inventoryService.addInventory({
        name: this.inventoryForm.value.name!,
      }).subscribe({
        next: () => {
          this.redirectToInventoryList();
        },
        error: (err) => console.log('Error al agregar invent', err)
      });
    }
  }

  clearSubmitted(): void {
    this.submitted = false;
  }

  redirectToInventoryList(): void {
    this.router.navigate(['/inventory']);
  }
}
