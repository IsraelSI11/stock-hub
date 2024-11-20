import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product, ProductItemTable } from '../../shared/interfaces/product.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { InventoryService } from '../../services/inventory/inventory.service';
import { Inventory } from '../../shared/interfaces/inventory.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { ProductEditData, ProductEditFormDialogComponent } from '../../product/product-edit-form-dialog/product-edit-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteDialogComponent } from '../../product/product-delete-dialog/product-delete-dialog.component';

@Component({
  selector: 'app-inventory-details',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatIcon],
  providers: [InventoryService],
  templateUrl: './inventory-details.component.html',
  styleUrl: './inventory-details.component.css'
})
export class InventoryDetailsComponent implements OnInit, AfterViewInit {

  private _liveAnnouncer = inject(LiveAnnouncer);

  inventoryId = '';
  displayedColumns = ['code', 'name', 'category', 'stock', 'price', 'actions'];
  products: ProductItemTable[] = [];
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  inventoryService = inject(InventoryService);
  inventory: Inventory | null = null;
  dataSource = new MatTableDataSource<ProductItemTable>([]);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
      this.inventoryService.getInventory(this.inventoryId).subscribe({
        next: (inventory) => {
          this.inventory = inventory;
          console.log('Inventario:', inventory);
          this.dataSource = new MatTableDataSource(parseProducts(inventory.products));
        },
        error: (err) => console.log('Error al obtener inventario', err)
      });
    });
  }



  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  product(invId: string) {
    this.router.navigate(['/product/inventory/', invId]);
  }

  productInv(inventoryId: string) {
    this.router.navigate(['/product/inventory/add', inventoryId]);
  }

  categoryInv(inventoryId: string) {
    this.router.navigate(['/category/add', inventoryId]);
  }

  categoryList(inventoryId: string) {
    this.router.navigate(['/category/', inventoryId]);
  }

  inventoryUsers(inventoryId: string) {
    this.router.navigate(['/inventory/user', inventoryId]);
  }

  modifyProduct(product: any): void {
    console.log(product)
    const dialogRef = this.dialog.open(ProductEditFormDialogComponent, {
      width: '400px',
      data: { inventoryId: this.inventoryId, ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto actualizado:', result);
        window.location.reload();
      }
    });
  }

  deleteProduct(productId: string, code:string): void {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      width: '400px',
      data: { productId: productId, code: code}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto eliminado:', result);
        window.location.reload();
      }
    });
  }

  viewDetails(productId: string): void {

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
}

function parseProducts(products: Product[]): ProductItemTable[] | undefined {
  return products.map((product) => {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      category: product.category.name,
      stock: product.stock,
      price: product.price
    };
  });
}

