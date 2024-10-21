import { Component, computed, input } from '@angular/core';
import { Monster } from '../../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.scss'
})
export class PlayingCardComponent {

  monster = input(new Monster());
  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].emoji
  });
  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color
  });
}
