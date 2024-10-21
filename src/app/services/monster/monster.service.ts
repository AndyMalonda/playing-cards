import { Injectable } from '@angular/core';
import { Monster } from '../../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem("monsters", JSON.stringify(this.monsters));
  }

  private load() {
    const monsterData = localStorage.getItem("monsters");
    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) => Object.assign(new Monster(), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id))
    } else {
      this.init();
      // this.save();
    }
  }

  private init() {

    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "Pikachu";
    monster1.image = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png";
    monster1.type = MonsterType.ELECTRIC;
    monster1.hp = 100;
    monster1.figureCaption = "Electric Mouse";
    monster1.attackName = "Thunderbolt";
    monster1.attackStrength = 20;
    monster1.attackDescription = "A powerful electric attack that can paralyze the opponent.";

    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = "Charmander";
    monster2.image = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png";
    monster2.type = MonsterType.FIRE;
    monster2.hp = 120;
    monster2.figureCaption = "Fire Lizard";
    monster2.attackName = "Flamethrower";
    monster2.attackStrength = 25;
    monster2.attackDescription = "A powerful fire attack that can burn the opponent.";

    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = "Squirtle";
    monster3.image = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png";
    monster3.type = MonsterType.WATER;
    monster3.hp = 110;
    monster3.figureCaption = "Tiny Turtle";
    monster3.attackName = "Water Gun";
    monster3.attackStrength = 15;
    monster3.attackDescription = "A basic water attack that can hit the opponent.";

    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = "Bulbasaur";
    monster4.image = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png";
    monster4.type = MonsterType.PLANT;
    monster4.hp = 110;
    monster4.figureCaption = "Seed Pokemon";
    monster4.attackName = "Vine Whip";
    monster4.attackStrength = 15;
    monster4.attackDescription = "A basic plant attack that can hit the opponent.";

    this.monsters.push(monster4);
  }

  getAll(): Monster[] {
    return this.monsters.map(monster => monster.copy());
  }

  getId(id: number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    this.currentIndex++;
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster | undefined {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(monster => monster.id === monsterCopy.id);
    if (monsterIndex === -1) {
      return undefined;
    } else {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
      return monsterCopy;
    }
  }

  delete(id: number): boolean {
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === id);
    if (monsterIndex === -1) {
      return false;
    } else {
      this.monsters.splice(monsterIndex, 1);
      this.save();
      return true;
    }
  }

}
