import { Component, OnInit, inject } from '@angular/core';
import { RosterService, Player } from '../../shared/roster.service';
import { map } from 'rxjs';
import { CommonModule, KeyValue } from '@angular/common';

const POSITION_ORDER = ['PG', 'SG', 'SF', 'PF', 'C'];
const PIXELS_PER_CHAR = 10;

@Component({
  selector: 'app-roster-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent implements OnInit {
  private roster = inject(RosterService);

  cardSize = 0;

  playersByPosition$ = this.roster.list().pipe(
    map((players) => {
      let maxNameLength = 0;
      const groups = players.reduce((acc, player) => {
        (acc[player.position] ||= []).push(player);
        const fullName = `${player.firstName} ${player.lastName}`;
        maxNameLength = Math.max(maxNameLength, fullName.length);
        return acc;
      }, {} as Record<string, Player[]>);
      this.cardSize = maxNameLength * PIXELS_PER_CHAR;
      return groups;
    })
  );

  sortByPosition = (
    a: KeyValue<string, Player[]>,
    b: KeyValue<string, Player[]>
  ) => POSITION_ORDER.indexOf(a.key) - POSITION_ORDER.indexOf(b.key);

  selectedPlayer: Player | null = null;

  toggle(player: Player) {
    this.selectedPlayer = this.selectedPlayer === player ? null : player;
  }

  ngOnInit() {
    this.roster.refresh();
  }
}