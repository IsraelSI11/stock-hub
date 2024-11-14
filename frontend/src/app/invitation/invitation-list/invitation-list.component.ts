import { Component, inject, OnInit } from '@angular/core';
import { InvitationStateService } from '../../services/invitation/invitation-state.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-invitation-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatCardModule],
  providers: [InvitationStateService],
  templateUrl: './invitation-list.component.html',
  styleUrl: './invitation-list.component.css'
})
export default class InvitationListComponent implements OnInit{

  invitationState = inject(InvitationStateService);

  ngOnInit(): void {
    this.invitationState.loadInvitationsOfUser();
  }

  acceptInvitation(invitationId: string): void {
    this.invitationState.acceptInvitation(invitationId);
  }

  declineInvitation(invitationId: string): void {
    this.invitationState.declineInvitation(invitationId);
  }

}
