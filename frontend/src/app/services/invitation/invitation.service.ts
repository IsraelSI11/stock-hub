import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../../shared/constants/apiUrl';
import { Invitation, InvitationForm } from '../../shared/interfaces/invitation.interface';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) {}

  getInvitationsOfUser(): Observable<Invitation[]> {
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Invitation[]>(`${apiUrl}/invitation`, options).pipe(
      tap(() => console.log('Invitaciones obtenidos'))
    );
  }

  sendInvitation(invitation: InvitationForm, inventoryId:string): Observable<any> {
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(invitation, inventoryId, "INvitacion");
    return this.http.post(`${apiUrl}/invitation/${inventoryId}`, invitation, options).pipe(
      tap(() => console.log('Invitación enviada'))
    );
  }

  acceptInvitation(invitationId: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${apiUrl}/invitation/accept/${invitationId}`, {}, options).pipe(
      tap(() => console.log('Invitación aceptada'))
    );
  }

  declineInvitation(invitationId: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(`${apiUrl}/invitation/decline/${invitationId}`, options).pipe(
      tap(() => console.log('Invitación rechazada'))
    );
  }


}
