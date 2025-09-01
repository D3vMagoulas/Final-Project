import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, AuthRequest } from '../../../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  returnUrl = '/';
  pending = false;
  error: string | null = null;
  show = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  submit(): void {
    if (this.form.invalid || this.pending) return;

    this.pending = true;
    this.error = null;

    const body = this.form.value as AuthRequest;

    this.auth.login(body).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: () => {
        this.error = 'Invalid credentials. Please try again.';
        this.pending = false;
      },
    });
  }
}
