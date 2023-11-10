const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        pokemonCount: Int!
        allPokemons(order: String): [Pokemon!]!
        findPokemon(name: String, id: String): Pokemon
        findPokemonsByType(type: String, order: String): [Pokemon!]!
        pokemonsByGeneration(generationName: String): [Pokemon!]!
        filteredPokemons(
        generationName: String
        type: String
        sortBy: String
        sortOrder: String
        ): [Pokemon!]!
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

module.exports = typeDefs;
