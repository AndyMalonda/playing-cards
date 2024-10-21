export enum MonsterType {
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water",
    PLANT = "plant",
    // PSYCHIC = "psychic",
    // GROUND = "ground",
    // ROCK = "rock",
    // ICE = "ice",
    // DRAGON = "dragon",
    // FIGHTING = "fighting",
    // POISON = "poison",
    // BUG = "bug",
    // GHOST = "ghost",
    // DARK = "dark",
    // STEEL = "steel",
    // FAIRY = "fairy",
    // NORMAL = "normal",
    // FLYING = "flying"
}

export interface IMonsterProperties {
    emoji: string;
    color: string;
}

export const MonsterTypeProperties: {[key: string] : IMonsterProperties} = {
    [MonsterType.ELECTRIC]: {
        emoji: "⚡",
        color: "#FFD700"
    },
    [MonsterType.FIRE]: {
        emoji: "🔥",
        color: "#FF4500"
    },
    [MonsterType.WATER]: {
        emoji: "💧",
        color: "#00BFFF"
    },
    [MonsterType.PLANT]: {
        emoji: "🌿",
        color: "#228B22"
    }
}