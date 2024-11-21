import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RoleName } from "../../shared/enum/roleName";
import { apiUrl } from "../../shared/constants/apiUrl";

@Injectable({
  providedIn: 'root'
})
export class UserInventoryService {

  constructor(private http: HttpClient) { }

  updatePermissionsOfUser(userId: string, inventoryId: string, permission: RoleName): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${apiUrl}/inventory/user/${inventoryId}/${userId}`, {roleName: permission}, options).pipe(
      tap(() => console.log('Permisos actualizados'))
    );
  }

  deleteUserFromInventory(userId: string, inventoryId: string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(`${apiUrl}/inventory/user/${inventoryId}/${userId}`, options).pipe(
      tap(() => console.log('Permisos eliminados'))
    );
  }



}