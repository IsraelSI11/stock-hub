import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvitationService } from '../../services/invitation/invitation.service';
import { ActivatedRoute } from '@angular/router';
import { RoleName } from '../../shared/enum/roleName';

@Component({
  selector: 'app-invitation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.css'
})
export default class InvitationFormComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private invitationService = inject(InvitationService);

  submitted = false;
  inventoryId = '';

  invitationForm = this.formBuilder.group({
    to: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.invitationForm.valid) {
      this.invitationService.sendInvitation({
        to: this.invitationForm.value.to!,
        role: this.invitationForm.value.role! as unknown as RoleName,
      }, this.inventoryId).subscribe({
        next: () => console.log('Invitación enviada'),
        error: (err) => console.log('Error al enviar invitación', err)
      });
    }
  }

  clearSubmitted(): void {
    this.submitted = false;
  }
}
