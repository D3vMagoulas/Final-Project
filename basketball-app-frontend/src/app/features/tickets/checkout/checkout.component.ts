// src/app/features/tickets/checkout/checkout.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../../shared/tickets.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone:true,
  selector:'app-checkout',
  imports:[ReactiveFormsModule, NgIf],
  template: `
  <h2>Checkout</h2>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <label>Quantity
      <input type="number" formControlName="qty" min="1">
    </label>
    <button type="submit" [disabled]="form.invalid || loading">Purchase</button>
    <div *ngIf="msg">{{msg}}</div>
  </form>
  `,
})
export class CheckoutComponent {
  private route = inject(ActivatedRoute);
  private api = inject(TicketsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  id = Number(this.route.snapshot.paramMap.get('id'));
  form = this.fb.group({ qty: [1, [Validators.required, Validators.min(1)]] });
  loading = false; msg = '';

  submit(){
    this.loading = true;
    this.api.purchase(this.id, this.form.value.qty!).subscribe({
      next: () => { this.msg = 'Success!'; this.loading = false; this.router.navigateByUrl('/tickets'); },
      error: () => { this.msg = 'Failed, try again.'; this.loading = false; }
    });
  }
}
