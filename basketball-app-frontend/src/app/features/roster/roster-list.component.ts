import { Component, OnInit, inject } from '@angular/core';
import { RosterService, Player } from '../../shared/roster.service';
import { map } from 'rxjs';
import { CommonModule, KeyValue } from '@angular/common';

const POSITION_ORDER = ['PG', 'SG', 'SF', 'PF', 'C'];

@Component({
  selector: 'app-roster-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent implements OnInit {
  private roster = inject(RosterService);

  playersByPosition$ = this.roster.list().pipe(
    map((players) =>
      players.reduce((groups, player) => {
        (groups[player.position] ||= []).push(player);
        return groups;
      }, {} as Record<string, Player[]>)
    )
  );

  sortByPosition = (
    a: KeyValue<string, Player[]>,
    b: KeyValue<string, Player[]>
  ) => POSITION_ORDER.indexOf(a.key) - POSITION_ORDER.indexOf(b.key);

  ngOnInit() {
    this.roster.refresh();
  }
}