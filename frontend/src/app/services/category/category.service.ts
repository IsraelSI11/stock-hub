import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../../shared/constants/apiUrl';
import { Product, ProductForm } from '../../shared/interfaces/product.interface';
import { Category, CategoryForm } from '../../shared/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategoriesByInventoryId(inventoryId:string): Observable<Category[]> {
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Category[]>(`${apiUrl}/category/${inventoryId}`, options).pipe(
      tap(() => console.log('Categorias obtenidos'))
    );
  }

  addCategory(category: CategoryForm, inventoryId:string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(category, inventoryId, "Categoria");
    return this.http.post(`${apiUrl}/category/${inventoryId}`, category, options).pipe(
      tap(() => console.log('Categoría agregada'))
    );
  }

    

}
