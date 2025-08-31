import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { TicketService, Fixture } from '../../shared/ticket.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  imports: [CommonModule, DatePipe, RouterLink],
})
export class TicketsListComponent {
  private api = inject(TicketService);
  fixtures$!: Observable<Fixture[]>;

  ngOnInit(): void {
    this.fixtures$ = this.api.list();
  }
}
