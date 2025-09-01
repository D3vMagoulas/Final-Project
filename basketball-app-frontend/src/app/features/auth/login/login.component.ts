import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthRequest, AuthService } from '../../../core/auth/auth.service';

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


  returnUrl: string = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

  pending = false;
  error: string | null = null;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor() {
    const preset = this.route.snapshot.queryParamMap.get('username');
    if (preset) this.form.patchValue({ username: preset });
  }

  submit(): void {
    if (this.form.invalid || this.pending) return;
    this.pending = true;
    this.error = null;

    const body = this.form.getRawValue() as AuthRequest;

    this.auth.login(body).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: (err) => {
        this.pending = false;
        this.error = err?.error?.message ?? 'Login failed. Please try again.';
      },
    });
  }

  get f() { return this.form.controls; }
}
