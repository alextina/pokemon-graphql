const pokemons = require("./pokemons.json");

pokemons.forEach((pokemon) => {
    pokemon.id = pokemon.num;
    pokemon.pokemonRarity = pokemon["pokemon-rarity"];
    pokemon.spawnChance = pokemon["spawn-chance"];
    pokemon.buddyDistanceKm = pokemon["buddy-distance-km"];
    pokemon.baseFleeRate = pokemon.encounter["base-flee-rate"];
    pokemon.baseCaptureRate = pokemon.encounter["base-capture-rate"];
});

const resolvers = {
    Query: {
        pokemonCount: () => pokemons.length,
        allPokemons: (root, args) => {
            const { order } = args;
            let sortedPokemons = [...pokemons];
            if (order === 'AZ') {
                sortedPokemons = sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
            } else if (order === 'ZA') {
                sortedPokemons = sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
            }
            return sortedPokemons;
        },
        findPokemon: (root, args) => {
            const { name, id } = args;
            if (name) {
                return pokemons.find((pokemon) => pokemon.name === name);
            }
            if (id) {
                return pokemons.find((pokemon) => pokemon.id === id);
            }
            return null;
        },
        findPokemonsByType: (root, args) => {
            const { type, order } = args;
            let filteredPokemons = pokemons.filter((pokemon) => pokemon.type.includes(type));
            if (order === 'AZ') {
                filteredPokemons = filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
            } else if (order === 'ZA') {
                filteredPokemons = filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
            }
            return filteredPokemons;
        },
        pokemonsByGeneration: (root, args) => {
            const { generationName } = args;
            const filteredPokemons = pokemons.filter(pokemon => pokemon.generation.name === generationName);
            return filteredPokemons;
        },
        filteredPokemons: (root, args) => {
            let filteredPokemons = [...pokemons];
            const { generationName, type, sortBy, sortOrder } = args;
            if (generationName) {
                filteredPokemons = filteredPokemons.filter(pokemon => pokemon.generation.name === generationName);
            }
            if (type) {
                filteredPokemons = filteredPokemons.filter(pokemon => pokemon.type.includes(type));
            }
            if (sortBy) {
                filteredPokemons.sort((a, b) => {
                    const aValue = a[sortBy];
                    const bValue = b[sortBy];
                    return sortOrder === 'DESC' ? bValue - aValue : aValue - bValue;
                });
            }
            return filteredPokemons;
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
                const evolutionData = pokemon.evolution || {};
                return {
                    candy: evolutionData.candy || "",
                    nextEvolution: (evolutionData["next-evolution"] || []).map((next) => ({
                        num: next.num || "",
                        name: next.name || "",
                        candyCost: next["candy-cost"] || "",
                        nextEvolution: (next["next-evolution"] || []).map((subNext) => ({
                            num: subNext.num || "",
                            name: subNext.name || "",
                            candyCost: subNext["candy-cost"] || "",
                        })),
                    })),
                    prevEvolution: (evolutionData["prev-evolution"] || []).map((prev) => ({
                        num: prev.num || "",
                        name: prev.name || "",
                        candyCost: prev["candy-cost"] || "",
                        nextEvolution: (prev["prev-evolution"] || []).map((subPrev) => ({
                            num: subPrev.num || "",
                            name: subPrev.name || "",
                            candyCost: subPrev["candy-cost"] || "",
                        })),
                    })),
                };
            },
    },
};

module.exports = resolvers;