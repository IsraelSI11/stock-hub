import { Component, inject, OnInit } from '@angular/core';
import { InvitationStateService } from '../../services/invitation/invitation-state.service';

@Component({
  selector: 'app-invitation-list',
  standalone: true,
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
