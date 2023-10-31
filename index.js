const { ApolloServer, gql } = require("apollo-server");
const pokemons = require("./pokemons.json");

pokemons.forEach((pokemon) => {
    pokemon.id = pokemon.num;
    pokemon.pokemonRarity = pokemon["pokemon-rarity"];
    pokemon.spawnChance = pokemon["spawn-chance"];
    pokemon.buddyDistanceKm = pokemon["buddy-distance-km"];
    pokemon.baseFleeRate = pokemon.encounter["base-flee-rate"];
    pokemon.baseCaptureRate = pokemon.encounter["base-capture-rate"];
});

const typeDefinitions = gql`
    type Query {
    pokemonCount: Int!
    allPokemons: [Pokemon!]!
    findPokemon(name: String!): Pokemon
    }

    type Pokemon {
    id: String!
    num: String!
    name: String!
    generation: Generation!
    about: String!
    img: String!
    size: Size!
    pokemonRarity: String!
    type: [String!]!
    encounter: Encounter!
    spawnChance: String
    stats: Stats!
    resistant: [String!]!
    weaknesses: [String!]!
    quickMove: [Move!]
    specialAttack: [Move!]
    egg: String!
    buddyDistanceKm: String!
    evolution: Evolution!
    }

    type Generation {
    num: String!
    name: String!
    }

    type Size {
    height: String!
    weight: String!
    }

    type Encounter {
    baseFleeRate: String
    baseCaptureRate: String
    }

    type Stats {
    baseAttack: String!
    baseDefense: String!
    baseStamina: String!
    maxCp: String!
    maxHp: String!
    }

    type Move {
    name: String
    type: String
    baseDamage: String
    energy: String
    moveDurationSeg: String
    }

    type Evolution {
    candy: String!
    nextEvolution: [NextEvolution!]
    prevEvolution: [PrevEvolution!]
    }

    type NextEvolution {
    num: String!
    name: String!
    candyCost: String!
    }

    type PrevEvolution {
    num: String!
    name: String!
    candyCost: String!
    }
    `;

const resolvers = {
    Query: {
        pokemonCount: () => pokemons.length,
        allPokemons: () => pokemons,
        findPokemon: (root, args) => {
            const name = args.name;
            return pokemons.find((pokemon) => pokemon.name === name);
        },
    },
    Pokemon: {
        encounter: (pokemon) => {
            return {
                baseFleeRate: pokemon.encounter["base-flee-rate"],
                baseCaptureRate: pokemon.encounter["base-capture-rate"],
            };
        },
        stats: (pokemon) => {
            return {
                baseAttack: pokemon.stats["base-attack"],
                baseDefense: pokemon.stats["base-defense"],
                baseStamina: pokemon.stats["base-stamina"],
                maxCp: pokemon.stats["max-cp"],
                maxHp: pokemon.stats["max-hp"],
            };
        },
        quickMove: (pokemon) => {
            return pokemon["quick-move"].map((move) => ({
                name: move.name,
                type: move.type,
                baseDamage: move["base-damage"],
                energy: move.energy,
                moveDurationSeg: move["move-duration-seg"],
            }));
        },
        specialAttack: (pokemon) => {
            return pokemon["special-attack"].map((attack) => ({
                name: attack.name,
                type: attack.type,
                baseDamage: attack["base-damage"],
                energy: attack.energy,
                moveDurationSeg: attack["move-duration-seg"],
            }));
        },
        evolution: (pokemon) => {
            return {
                candy: pokemon.evolution.candy,
                nextEvolution: pokemon.evolution["next-evolution"].map((next) => ({
                    num: next.num,
                    name: next.name,
                    candyCost: next["candy-cost"],
                    nextEvolution: (next["next-evolution"] || []).map((subNext) => ({
                        num: subNext.num,
                        name: subNext.name,
                        candyCost: subNext["candy-cost"],
                    })),
                })),
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
