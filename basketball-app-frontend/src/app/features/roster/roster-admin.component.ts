import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RosterService, Player } from '../../shared/roster.service';
import { AuthService } from '../../core/auth/auth.service';
import { PlayerFormComponent } from './player-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roster-admin',
  standalone: true,
  imports: [CommonModule, PlayerFormComponent, MatDialogModule],
  templateUrl: './roster-admin.component.html',
  styleUrls: ['./roster-admin.component.scss'],
})
export class RosterAdminComponent {
  private roster = inject(RosterService);
  public auth = inject(AuthService);
  private dialog = inject(MatDialog);

  players$ = this.roster.list();
  editing = signal<Player | null>(null);

  constructor() {
    this.roster.refresh();
  }

  addNew() {
    if (!this.auth.isAdmin()) return;
   this.editing.set({
      id: 0,
      firstName: '',
      lastName: '',
      position: '',
      numberOnJersey: 0,
      heightCm: 0,
      birthDate: '',
      nationality: '',
      photoUrl: '',
      active: true,
    });
  }

  edit(player: Player) {
    if (!this.auth.isAdmin()) return;
    this.editing.set({ ...player });
  }

  remove(player: Player) {
    this.dialog
      .open(ConfirmDialogComponent, { data: { name: player.fullName } })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.roster.remove(player.id).subscribe(() => this.roster.refresh());
        }
      });
  }

  saved() {
    this.editing.set(null);
    this.roster.refresh();
  }

  cancel() {
    this.editing.set(null);
  }
}