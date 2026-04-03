const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
    name: string;
    hp: number;
    attack: number;
    defense: number;
    moves: string[];
}

export interface Move {
    name: string;
    power: number | null; // null у статусных мувов (Growl, Splash...)
    type: string;
    category: "physical" | "special" | "status";
}

export async function getPokemon(name: string): Promise<Pokemon> {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error(`Pokemon not found: ${name}`);

    const data = await res.json();
    return {
        name: data.name,
        hp: data.stats.find((s: any) => s.stat.name === "hp").base_stat,
        attack: data.stats.find((s: any) => s.stat.name === "attack").base_stat,
        defense: data.stats.find((s: any) => s.stat.name === "defense").base_stat,
        moves: data.moves.map((m: any) => m.move.name),
    };
}

export async function getMoveDetails(moveName: string): Promise<Move> {
    const res = await fetch(`${BASE_URL}/move/${moveName}`);
    if (!res.ok) throw new Error(`Move not found: ${moveName}`);

    const data = await res.json();
    return {
        name: data.name,
        power: data.power,
        type: data.type.name,
        category: data.damage_class.name,
    };
}

/**
 * Из всех мувов покемона находит тот, у которого наибольший power.
 * Если ни у одного нет урона — возвращает null.
 */
export async function getStrongestMove(pokemonName: string): Promise<Move | null> {
    const pokemon = await getPokemon(pokemonName);

    const moveDetails = await Promise.all(
        pokemon.moves.map((moveName) => getMoveDetails(moveName))
    );

    const damagingMoves = moveDetails.filter((m) => m.power !== null);
    if (damagingMoves.length === 0) return null;

    return damagingMoves.reduce((best, move) =>
        (move.power ?? 0) > (best.power ?? 0) ? move : best
    );
}

/**
 * Сравнивает двух покемонов и возвращает имя победителя.
 * Формула: attack - defense_соперника + hp
 * Если счёт равный — возвращает "draw".
 */
export async function battle(name1: string, name2: string): Promise<string> {
    const [p1, p2] = await Promise.all([getPokemon(name1), getPokemon(name2)]);

    const score1 = p1.attack - p2.defense + p1.hp;
    const score2 = p2.attack - p1.defense + p2.hp;

    if (score1 > score2) return p1.name;
    if (score2 > score1) return p2.name;
    return "draw";
}
