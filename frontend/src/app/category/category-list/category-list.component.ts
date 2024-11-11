import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryStateService } from '../../services/category/category-state.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  providers: [CategoryStateService],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export default class CategoryListComponent implements OnInit{

  inventoryId = '';
  private route = inject(ActivatedRoute);

  categoryState = inject(CategoryStateService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
      this.categoryState.loadCategoriesByInventoryId(this.inventoryId);
    });
  }
}
