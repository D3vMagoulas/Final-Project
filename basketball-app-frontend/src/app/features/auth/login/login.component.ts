import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthRequest } from '../../../core/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loading = false;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snack: MatSnackBar) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value as AuthRequest).subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl('/'); },
      error: err => { this.loading = false; this.snack.open(err?.error?.message ?? 'Login failed', 'Close', { duration: 3000 }); }
    });
  }
}