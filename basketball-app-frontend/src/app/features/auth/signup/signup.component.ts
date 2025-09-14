import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../core/auth/auth.service';
import { SignupRequest } from '../../../core/auth/auth.models';

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
  private route = inject(ActivatedRoute);

  returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
  pending = false;
  error: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pending = true;
    this.error = null;

    const payload = this.form.value as SignupRequest;

    this.auth
      .signup(payload)
      .pipe(finalize(() => (this.pending = false)))
      .subscribe({
        next: () =>
          this.router.navigateByUrl('/auth/login', {
            state: {
              msg: 'Ο λογαριασμός σας δημιουργήθηκε επιτυχώς ! Συνδεθείτε για να συνεχίσετε.',
            },
          }),
        error: (err) => {
          if (err.status === 409) {
            this.error = 'Email or phone already registered';
          } else {
            this.error = 'Αδυναμία δημιουργίας λογαρισμού , προσπαθείστε ξανά .';
          }
        },
      });
  }
}
