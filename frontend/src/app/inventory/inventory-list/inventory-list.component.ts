import { Component, inject } from '@angular/core';
import { InventoryStateService } from '../../services/inventory/inventory-state.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  providers: [InventoryStateService],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {

  inventoryState = inject(InventoryStateService);
  
  constructor(){
    console.log(this.inventoryState);
    console.log(this.inventoryState.state());
  }
}
