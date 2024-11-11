import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { CategoryService } from './category.service';
import { Category } from '../../shared/interfaces/category.interface';

interface CategoryState {
    categories: Category[];
    state: 'loading' | 'error' | 'success';
}

@Injectable()
export class ProductStateService {

    private categoryService = inject(CategoryService);

    // Estado inicial de inventario
    private initialState: CategoryState = {
        categories: [],
        state: 'loading' as const
    };

    // Crear la señal de estado como WritableSignal
    state = signal<CategoryState>(this.initialState);

    constructor() {}

    // Método para cargar inventarios desde el servicio y actualizar la señal
    loadCategoriesByInventoryId(inventoryId:string): void {
        // Actualizar el estado a "loading" antes de la llamada
        this.state.set({ ...this.state(), state: 'loading' as const });

        // Llamada al servicio para obtener los inventarios
        this.categoryService.getCategoriesByInventoryId(inventoryId).subscribe({
            next: (categories) => {
                console.log(categories, "Categories");
                // Actualizar el estado en caso de éxito
                this.state.set({
                    categories,
                    state: 'success'
                });
            },
            error: (err) => {
                console.log(err, "err");
                // Actualizar el estado en caso de error
                this.state.set({
                    categories: [],
                    state: 'error'
                });
            }
        });
    }
}
