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
    
    return this.http.get<Inventory[]>(`${apiUrl}/user/login`, options).pipe(
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

    

}
