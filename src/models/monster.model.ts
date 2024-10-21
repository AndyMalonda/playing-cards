import { MonsterType } from "../app/utils/monster.utils";

export class Monster {
    id: number = -1;
    name : string = "Playing Card";
    image: string = "";
    type : MonsterType = MonsterType.ELECTRIC;
    hp : number = 0;
    figureCaption : string = "Figure Caption";
    attackName : string = "Attack Name";
    attackStrength : number = 0;
    attackDescription : string = "Attack Description";

    copy(): Monster {
        return Object.assign(new Monster(), this);
    }
}