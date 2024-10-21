import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Monster } from '../../../models/monster.model';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [RouterOutlet, PlayingCardComponent, SearchBarComponent, CommonModule],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.scss'
})
export class MonsterListComponent {
  private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = signal<Monster[]>([]);

  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.toLowerCase().includes(this.search().toLowerCase()));
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['/monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['/monster', monster.id]);
  }
}
