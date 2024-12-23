import { inject, Injectable, signal } from '@angular/core';
import { Invitation } from '../../shared/interfaces/invitation.interface';
import { InvitationService } from './invitation.service';

interface InvitationState {
    invitations: Invitation[];
    state: 'loading' | 'error' | 'success';
}

@Injectable()
export class InvitationStateService {

    private invitationService = inject(InvitationService);

    private initialState: InvitationState = {
        invitations: [],
        state: 'loading' as const
    };

    // Crear la señal de estado como WritableSignal
    state = signal<InvitationState>(this.initialState);

    constructor() {}

    loadInvitationsOfUser(): void {
        // Actualizar el estado a "loading" antes de la llamada
        this.state.set({ ...this.state(), state: 'loading' as const });

        this.invitationService.getInvitationsOfUser().subscribe({
            next: (invitations) => {
                console.log(invitations, "Invitations");
                // Actualizar el estado en caso de éxito
                this.state.set({
                    invitations,
                    state: 'success'
                });
            },
            error: (err) => {
                console.log(err, "err");
                // Actualizar el estado en caso de error
                this.state.set({
                    invitations: [],
                    state: 'error'
                });
            }
        });
    }

    acceptInvitation(invitationId: string): void {
        this.invitationService.acceptInvitation(invitationId).subscribe(() => {
            this.loadInvitationsOfUser();
        });
    }

    declineInvitation(invitationId: string): void {
        this.invitationService.declineInvitation(invitationId).subscribe(() => {
            this.loadInvitationsOfUser();
        });
    }
}
