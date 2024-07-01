import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/ApiServices/user.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],

})
export class InvitationComponent implements OnInit {
  invitations: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    this.userService.getUserInvitations().subscribe(
      (response) => {
        this.invitations = response.data; // Adjust based on your API response structure
      },
      (error) => {
        console.error('Error fetching invitations:', error);
      }
    );
  }

  acceptInvitation(invitationId: number): void {
    this.userService.acceptInvitation(invitationId).subscribe(
      () => {
        this.updateInvitationStatus(invitationId, 'ACCEPTED');
      },
      (error) => {
        console.error('Error accepting invitation:', error);
      }
    );
  }

  declineInvitation(invitationId: number): void {
    this.userService.declineInvitation(invitationId).subscribe(
      () => {
        this.updateInvitationStatus(invitationId, 'DECLINED');
      },
      (error) => {
        console.error('Error declining invitation:', error);
      }
    );
  }

  updateInvitationStatus(invitationId: number, status: string): void {
    this.invitations = this.invitations.map(invitation =>
      invitation.id === invitationId ? { ...invitation, status } : invitation
    );
  }

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];
  
}
