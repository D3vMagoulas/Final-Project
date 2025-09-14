import { Component, OnInit, inject } from '@angular/core';
import { RosterService, Player } from '../../shared/roster.service';
import { AuthService } from '../../core/auth/auth.service';
import { map } from 'rxjs';
import { CommonModule, KeyValue } from '@angular/common';
import { RouterLink } from '@angular/router';

const POSITION_ORDER = ['PG', 'SG', 'SF', 'PF', 'C'];
const POSITION_LABELS: Record<string, string> = {
  PG: 'Point Guard',
  SG: 'Shooting Guard',
  SF: 'Small Forward',
  PF: 'Power Forward',
  C: 'Center',
};
const PIXELS_PER_CHAR = 12
const CARD_HORIZONTAL_PADDING = 48;

@Component({
  selector: 'app-roster-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent implements OnInit {
  private roster = inject(RosterService);
  readonly auth = inject(AuthService);

  cardWidth = 0;
  cardHeight = 0;
  
  playersByPosition$ = this.roster.list().pipe(
    map((players) => {
      let maxNameLength = 0;
      const groups = players.reduce((acc, player) => {
        (acc[player.position] ||= []).push(player);
         maxNameLength = Math.max(maxNameLength, player.fullName?.length || 0);
        return acc;
      }, {} as Record<string, Player[]>);
      this.cardWidth = maxNameLength * PIXELS_PER_CHAR + CARD_HORIZONTAL_PADDING;
      this.cardHeight = this.cardWidth * 0.6;
      return groups;
    })
  );

  sortByPosition = (
    a: KeyValue<string, Player[]>,
    b: KeyValue<string, Player[]>
  ) => POSITION_ORDER.indexOf(a.key) - POSITION_ORDER.indexOf(b.key);

  positionLabel(position: string): string {
    return POSITION_LABELS[position] ?? position;
  }

  selectedPlayer: Player | null = null;

  toggle(player: Player) {
    this.selectedPlayer = this.selectedPlayer === player ? null : player;
  }

  ngOnInit() {
    this.roster.refresh();
  }
}