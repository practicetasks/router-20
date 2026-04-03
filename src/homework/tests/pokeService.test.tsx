import { jest, beforeEach, describe, test, expect } from "@jest/globals";
import { getPokemon, getMoveDetails, getStrongestMove, battle } from "../service/pokeService";

const fetchMock = jest.fn<typeof fetch>();
globalThis.fetch = fetchMock;

const createResponse = (data: unknown, ok = true, status = 200) =>
  ({
    ok,
    status,
    json: async () => data,
  } as Response);

const pikachuFixture = {
  name: "pikachu",
  stats: [
    { stat: { name: "hp" }, base_stat: 35 },
    { stat: { name: "attack" }, base_stat: 55 },
    { stat: { name: "defense" }, base_stat: 40 },
  ],
  moves: [{ move: { name: "thunderbolt" } }, { move: { name: "quick-attack" } }],
};

const charmanderFixture = {
  name: "charmander",
  stats: [
    { stat: { name: "hp" }, base_stat: 39 },
    { stat: { name: "attack" }, base_stat: 52 },
    { stat: { name: "defense" }, base_stat: 43 },
  ],
  moves: [{ move: { name: "scratch" } }, { move: { name: "growl" } }],
};

const onlyGrowlPokemonFixture = {
  name: "chek-puk",
  stats: [
    { stat: { name: "hp" }, base_stat: 999 },
    { stat: { name: "attack" }, base_stat: 999 },
    { stat: { name: "defense" }, base_stat: 999 },
  ],
  moves: [{ move: { name: "growl" } }],
}

const thunderboltFixture = {
  name: "thunderbolt",
  power: 90,
  type: { name: "electric" },
  damage_class: { name: "special" },
};

const quickAttackFixture = {
  name: "quick-attack",
  power: 40,
  type: { name: "normal" },
  damage_class: { name: "physical" },
};

const growlFixture = {
  name: "growl",
  power: null, // статусный мув — не наносит урон
  type: { name: "normal" },
  damage_class: { name: "status" },
};

beforeEach(() => {
  fetchMock.mockReset();
});

// ЗАДАНИЕ
//
// Напишите мок-тесты для функций getPokemon, getMoveDetails, getStrongestMove и battle.
// Используйте фикстуры выше

describe("getPokemon", () => {
  test("возвращает распарсенного покемона", async () => {
    fetchMock.mockResolvedValueOnce(createResponse(pikachuFixture));

    const result = await getPokemon("pikachu");

    expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
    expect(result).toEqual({
      name: "pikachu",
      hp: 35,
      attack: 55,
      defense: 40,
      moves: ["thunderbolt", "quick-attack"],
    })
  });

  test("выбрасывает ошибку при 404", async () => {
    fetchMock.mockResolvedValueOnce(createResponse({}, false, 404));

    await expect(getPokemon("ass")).rejects.toThrow('Pokemon not found: ass');

    expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/ass"
    );
  });
});

describe("getMoveDetails", () => {
  test("возвращает детали мува с уроном", async () => {
    fetchMock.mockResolvedValueOnce(createResponse(thunderboltFixture, true, 200))

    const result = await getMoveDetails("thunderbolt");

    expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/move/thunderbolt"
    );

    expect(result).toEqual({
      name: "thunderbolt",
      power: 90,
      type: "electric",
      category: "special",
    });
  });

  test("возвращает null в поле power для статусного мува", async () => {
    fetchMock.mockResolvedValueOnce(createResponse(growlFixture, true, 200))

    const result = await getMoveDetails("growl");

    expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/move/growl"
    );

    expect(result.power).toEqual(null);
  });
});

describe("getStrongestMove", () => {
  test("возвращает мув с наибольшим power", async () => {
    fetchMock
        .mockResolvedValueOnce(createResponse(pikachuFixture))
        .mockResolvedValueOnce(createResponse(thunderboltFixture))
        .mockResolvedValueOnce(createResponse(quickAttackFixture))

    const result = await getStrongestMove("pikachu");

    expect(result).toEqual(
        expect.objectContaining({ name: 'thunderbolt', })
    )
  });

  test("возвращает null если все мувы статусные (power === null)", async () => {
    fetchMock
        .mockResolvedValueOnce(createResponse(onlyGrowlPokemonFixture))
        .mockResolvedValueOnce(createResponse(growlFixture))

    const result = await getStrongestMove("chek-puk");

    expect(result).toBeNull()
  });
});

describe("battle", () => {
  test("возвращает имя победителя", async () => {
    fetchMock
        .mockResolvedValueOnce(createResponse(pikachuFixture))
        .mockResolvedValueOnce(createResponse(charmanderFixture));

    const result = await battle("pikachu", "charmander");

    expect(result).toBe("charmander");
  });

  test("возвращает 'draw' при равном счёте", async () => {
    // TODO — придумайте/измените фикстуры так, чтобы счёт был равным
    const pokemonOneFixture = {
      name: "one",
      stats: [
        { stat: { name: "hp" }, base_stat: 40 },
        { stat: { name: "attack" }, base_stat: 50 },
        { stat: { name: "defense" }, base_stat: 30 },
      ],
      moves: [],
    };

    const pokemonTwoFixture = {
      name: "two",
      stats: [
        { stat: { name: "hp" }, base_stat: 40 },
        { stat: { name: "attack" }, base_stat: 50 },
        { stat: { name: "defense" }, base_stat: 30 },
      ],
      moves: [],
    };

    fetchMock
        .mockResolvedValueOnce(createResponse(pokemonOneFixture))
        .mockResolvedValueOnce(createResponse(pokemonTwoFixture));

    const result = await battle("one", "two");

    expect(result).toBe("draw");
  });
});
