import { Component, inject } from '@angular/core';
import { InventoryStateService } from '../../services/inventory/inventory-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  providers: [InventoryStateService],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {

  private router = inject(Router);
  inventoryState = inject(InventoryStateService);
  
  constructor(){
    console.log(this.inventoryState);
    console.log(this.inventoryState.state());
  }

  product(invId: string){
    this.router.navigate(['/product/inventory/', invId]);
  }

  productInv(inventoryId: string){
    this.router.navigate(['/product/inventory/add', inventoryId]);
  }

  categoryInv(inventoryId: string){
    this.router.navigate(['/category/add', inventoryId]);
  }

  categoryList(inventoryId: string){
    this.router.navigate(['/category/', inventoryId]);
  }
}
