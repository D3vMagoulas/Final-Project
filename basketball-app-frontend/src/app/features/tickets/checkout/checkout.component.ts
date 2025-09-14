import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TicketService, PurchaseResponse, Fixture } from '../../../shared/ticket.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, FormsModule, DatePipe],
})
export class CheckoutComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(TicketService);
  private auth = inject(AuthService);

  id!: number;
  qty = 1;
  fullName = '';
  fixture$!: Observable<Fixture | undefined>;

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    this.id = raw ? Number(raw) : NaN;
    this.fixture$ = this.api
      .list()
      .pipe(map((fixtures) => fixtures.find((f) => f.id === this.id)));
  }

  purchase(): void {
    this.api
      .purchase({
        gameId: this.id,
        quantity: this.qty,
        buyerName: this.fullName,
        buyerEmail: this.auth.userEmail() || ''
      })
      .subscribe({
        next: (_res: PurchaseResponse) => this.router.navigate(['/tickets']),
        error: () => {}
      });
  }
}