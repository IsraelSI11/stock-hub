import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../../shared/constants/apiUrl';
import { Product, ProductForm } from '../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductsByInventoryId(inventoryId:string): Observable<Product[]> {
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Product[]>(`${apiUrl}/product/${inventoryId}`, options).pipe(
      tap(() => console.log('Productos obtenidos'))
    );
  }

  addProduct(product: ProductForm, inventoryId:string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(product, inventoryId);
    return this.http.post(`${apiUrl}/product/${inventoryId}`, product, options).pipe(
      tap(() => console.log('Producto agregado'))
    );
  }

  updateProduct(inventoryId:string,product: Product): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${apiUrl}/product/${inventoryId}/${product.id}`, product, options).pipe(
      tap(() => console.log('Producto actualizado'))
    );
  }

  deleteProduct(productId: string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(`${apiUrl}/product/${productId}`, options).pipe(
      tap(() => console.log('Producto eliminado'))
    );
  }

    

}
