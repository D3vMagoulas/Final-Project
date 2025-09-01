import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SignupRequest } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  public pending = false;
  public error: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{8,15}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.form.invalid || this.pending) return;

    this.pending = true;
    this.error = null;

    const body: SignupRequest = this.form.getRawValue() as SignupRequest;

    this.auth.signup(body).subscribe({
      next: () =>
        this.router.navigate(['/auth/login'], {
          queryParams: { username: body.email }
        }),
      error: (err) => {
        this.error = err?.error?.message ?? 'Signup failed';
        this.pending = false;
      }
    });
  }
}
