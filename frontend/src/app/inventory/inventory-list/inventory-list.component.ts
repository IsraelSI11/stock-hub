import { Component, inject } from '@angular/core';
import { InventoriesStateService } from '../../services/inventory/inventories-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  providers: [InventoriesStateService],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {

  private router = inject(Router);
  inventoriesState = inject(InventoriesStateService);
  
  constructor(){
    console.log(this.inventoriesState);
    console.log(this.inventoriesState.state());
  }

  details(inventoryId:string){
    this.router.navigate(['/inventory', inventoryId]);
  }

  redirectToInventoryForm(){
    this.router.navigate(['/form']);
  }
}
