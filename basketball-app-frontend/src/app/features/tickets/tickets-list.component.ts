import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TicketService, Fixture } from '../../shared/ticket.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  imports: [CommonModule, DatePipe]
})
export class TicketsListComponent {
  private api = inject(TicketService);
  private auth = inject(AuthService);

  fixtures$!: Observable<Fixture[]>;

  ngOnInit() { this.fixtures$ = this.api.list(); }

  get isAuthed(): boolean { return this.auth.isLoggedIn(); }
}

