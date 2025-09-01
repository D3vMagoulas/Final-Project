import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService, PurchaseResponse } from '../../../shared/ticket.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(TicketService);

  id!: number;
  qty = 1;

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    this.id = raw ? Number(raw) : NaN;
  }

  purchase(): void {
    this.api.purchase(this.id, this.qty).subscribe({
      next: (_res: PurchaseResponse) => this.router.navigate(['/tickets']),
      error: () => {}
    });
  }
}
