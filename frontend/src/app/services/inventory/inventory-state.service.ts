import { inject, Injectable, signal, effect } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Inventory } from '../../shared/interfaces/inventory.interface';

interface InventoryState {
    inventories: Inventory[];
    state: 'loading' | 'error' | 'success';
}

@Injectable()
export class InventoryStateService {

    private inventoryService = inject(InventoryService);

    // Estado inicial de inventario
    private initialState: InventoryState = {
        inventories: [],
        state: 'loading' as const
    };

    // Crear la señal de estado como WritableSignal
    state = signal<InventoryState>(this.initialState);

    constructor() {
        // Llama a la función de carga al inicializar el servicio
        this.loadInventories();
    }

    // Método para cargar inventarios desde el servicio y actualizar la señal
    loadInventories(): void {
        // Actualizar el estado a "loading" antes de la llamada
        this.state.set({ ...this.state(), state: 'loading' as const });

        // Llamada al servicio para obtener los inventarios
        this.inventoryService.getInventoriesOfUser().subscribe({
            next: (inventories) => {
                console.log(inventories, "invent");
                // Actualizar el estado en caso de éxito
                this.state.set({
                    inventories,
                    state: 'success'
                });
            },
            error: (err) => {
                console.log(err, "err");
                // Actualizar el estado en caso de error
                this.state.set({
                    inventories: [],
                    state: 'error'
                });
            }
        });
    }
}
