import { Component, inject } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent {
  private formBuilder = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  inventoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  onSubmit(): void {
    this.inventoryService.addInventory({
      name: this.inventoryForm.value.name!,
    }).subscribe({
      next: () => console.log('Inventario agregado'),
      error: (err) => console.log('Error al agregar invent', err)
    });
  }
}
