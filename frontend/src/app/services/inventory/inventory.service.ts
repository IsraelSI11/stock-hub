import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inventory, InventoryForm } from '../../shared/interfaces/inventory.interface';
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {}

  getInventoriesOfUser(): Observable<Inventory[]> {
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Inventory[]>(`${apiUrl}/inventory`, options).pipe(
      tap(() => console.log('Usuario autenticado'))
    );
  }

  addInventory(inventory: InventoryForm): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(`${apiUrl}/inventory`, inventory, options).pipe(
      tap(() => console.log('Inventario agregado'))
    );
  }

  getInventory(inventoryId: string): Observable<Inventory> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Inventory>(`${apiUrl}/inventory/${inventoryId}`, options).pipe(
      tap(() => console.log('Inventario obtenido'))
    );
  }


  getUsersOfInventory(inventoryId: string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get(`${apiUrl}/inventory/user/${inventoryId}`, options).pipe(
      tap(() => console.log('Usuarios obtenidos'))
    );
  }
    

}
