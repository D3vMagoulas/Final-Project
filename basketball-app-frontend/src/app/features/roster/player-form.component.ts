import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { RosterService, Player } from '../../shared/roster.service';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private roster = inject(RosterService);
  public auth = inject(AuthService);

  @Input() player: Player | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    id: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    position: ['', [Validators.required]],
    numberOnJersey: [0, [Validators.required]],
    heightCm: [0],
    birthDate: [''],
    nationality: [''],
    photoUrl: [''],
    active: [true],
  });

  ngOnChanges() {
    if (this.player) {
      this.form.patchValue(this.player);
    } else {
      this.form.reset({
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
  }

  submit() {
    if (!this.auth.isAdmin() || this.form.invalid) return;
    const value = this.form.value as Player;
    const request = value.id ? this.roster.update(value) : this.roster.add(value);
    request.subscribe(() => this.saved.emit());
  }
}