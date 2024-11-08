import { Component, inject, OnInit } from '@angular/core';
import { ProductStateService } from '../../services/product/product-state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  providers: [ProductStateService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  inventoryId = '';
  private route = inject(ActivatedRoute);

  productState = inject(ProductStateService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
      this.productState.loadProductsByInventoryId(this.inventoryId);
    });
  }
}
