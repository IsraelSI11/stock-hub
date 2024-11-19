import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Inventory, InventoryItemTable } from '../../shared/interfaces/inventory.interface';
import { InventoryService } from '../../services/inventory/inventory.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  providers: [InventoryService],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit, AfterViewInit {

  private _liveAnnouncer = inject(LiveAnnouncer);

  private router = inject(Router);
  inventoriesService = inject(InventoryService);
  dataSource = new MatTableDataSource<InventoryItemTable>([]);
  displayedColumns = ['name', 'products', 'categories', 'actions'];


  ngOnInit(): void {
    this.inventoriesService.getInventoriesOfUser().subscribe({
      next: (inventories) => {
        this.dataSource =  new MatTableDataSource(this.parseInventories(inventories));
      },
      error: (err) => console.log('Error al obtener inventarios', err)
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  details(inventoryId: string) {
    this.router.navigate(['/inventory', inventoryId]);
  }

  redirectToInventoryForm() {
    this.router.navigate(['/form']);
  }

  productInv(inventoryId: string) {
    // Implement the action to add a product to the inventory
    console.log('Adding product to inventory with ID:', inventoryId);
  }

  categoryInv(inventoryId: string) {
    // Implement the action to add a category to the inventory
    console.log('Adding category to inventory with ID:', inventoryId);
  }

  categoryList(inventoryId: string) {
    // Implement the action to view categories of the inventory
    console.log('Viewing categories for inventory with ID:', inventoryId);
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  parseInventories(inventories: Inventory[]): InventoryItemTable[] {
    return inventories.map(inventory => ({
      id: inventory.id,
      name: inventory.name,
      products: inventory.products.length,
      categories: inventory.categories.length
    }));
  }
}
