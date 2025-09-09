import { Component, OnInit, inject } from '@angular/core';
import { RosterService } from '../../shared/roster.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roster-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent implements OnInit {
  private roster = inject(RosterService);

  players$ = this.roster
    .list()
    .pipe(
      map((players) =>
        [...players].sort((a, b) => a.position.localeCompare(b.position))
      )
    );

  ngOnInit() {
    this.roster.refresh();
  }
}