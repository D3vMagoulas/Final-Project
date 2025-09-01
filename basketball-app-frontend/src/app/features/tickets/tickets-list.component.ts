import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
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

  fixtures$: Observable<Fixture[]> = this.api.list();
}
