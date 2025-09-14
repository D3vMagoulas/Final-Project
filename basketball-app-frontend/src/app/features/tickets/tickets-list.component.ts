import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TicketService, Fixture } from '../../shared/ticket.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  imports: [CommonModule, RouterModule, DatePipe],
})
export class TicketsListComponent {
  public readonly auth = inject(AuthService);
  private api = inject(TicketService);

  @Input() limit?: number;

  fixtures$: Observable<Fixture[]> = this.api
    .list()
    .pipe(
      map((fixtures) => {
        const shuffled = fixtures.slice().sort(() => Math.random() - 0.5);
        return this.limit !== undefined ? shuffled.slice(0, this.limit) : shuffled;
      })
    );
}