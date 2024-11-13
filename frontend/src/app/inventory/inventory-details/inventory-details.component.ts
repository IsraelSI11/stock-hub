import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryStateService } from '../../services/inventory/inventory-state.service';

@Component({
  selector: 'app-inventory-details',
  standalone: true,
  providers: [InventoryStateService],
  templateUrl: './inventory-details.component.html',
  styleUrl: './inventory-details.component.css'
})
export class InventoryDetailsComponent implements OnInit {

  inventoryId = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  inventoryState = inject(InventoryStateService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
      this.inventoryState.loadInventory(this.inventoryId);
    });
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
