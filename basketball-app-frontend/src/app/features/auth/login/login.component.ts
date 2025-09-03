import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthRequest } from '../../../core/auth/auth.models';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
  pending = false;
  error: string | null = null;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pending = true;
    this.error = null;

    const payload = this.form.value as AuthRequest;

    this.auth
      .login(payload)
      .pipe(finalize(() => (this.pending = false)))
      .subscribe({
        next: () => this.router.navigateByUrl(this.returnUrl),
        error: () => (this.error = 'Invalid email or password.'),
      });
  }
}
