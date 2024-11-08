import { inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../../shared/interfaces/product.interface';

interface ProductState {
    products: Product[];
    state: 'loading' | 'error' | 'success';
}

@Injectable()
export class ProductStateService {

    private productService = inject(ProductService);

    // Estado inicial de inventario
    private initialState: ProductState = {
        products: [],
        state: 'loading' as const
    };

    // Crear la señal de estado como WritableSignal
    state = signal<ProductState>(this.initialState);

    constructor() {}

    // Método para cargar inventarios desde el servicio y actualizar la señal
    loadProductsByInventoryId(inventoryId:string): void {
        // Actualizar el estado a "loading" antes de la llamada
        this.state.set({ ...this.state(), state: 'loading' as const });

        // Llamada al servicio para obtener los inventarios
        this.productService.getProductsByInventoryId(inventoryId).subscribe({
            next: (products) => {
                console.log(products, "products");
                // Actualizar el estado en caso de éxito
                this.state.set({
                    products,
                    state: 'success'
                });
            },
            error: (err) => {
                console.log(err, "err");
                // Actualizar el estado en caso de error
                this.state.set({
                    products: [],
                    state: 'error'
                });
            }
        });
    }
}
