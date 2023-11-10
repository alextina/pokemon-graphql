# Proyecto Pokémon GraphQL
Este proyecto implementa un servidor GraphQL para acceder a información sobre Pokémon. El servidor proporciona varias consultas y filtrados para obtener datos específicos de los Pokémon.

### Índice
1. [Estructura de Archivos](#estructura-de-archivos)
2. [Ejecución del Proyecto](#ejecución-del-proyecto)
3. [Consultas y Ejemplos](#consultas-y-ejemplos)
4. [Datos disponibles de Pókemons](#datos-disponibles-de-los-pokémon)

## Estructura de Archivos

```
/src
  /graphql
    schema.js
    resolvers.js
  server.js
  pokemons.json
```

El proyecto consta de cuatro archivos principales:

* **resolvers.js:** En este archivo, se definen los resolvers que se utilizan para manejar las consultas GraphQL. Se incluye la lógica para filtrar y ordenar los Pokémon, así como para obtener detalles de un Pokémon específico.

* **schema.js:** Este archivo contiene la definición de los tipos de datos GraphQL y las consultas que el servidor admite. Aquí se describen los tipos como "Pokemon", "Generation", "Size", y otros, junto con las relaciones entre ellos.

* **server.js:** El archivo principal del servidor, donde se crea una instancia de Apollo Server. Aquí se combinan los resolvers y el esquema para ejecutar el servidor GraphQL.

* **pokemons.json:** Este archivo contiene los datos de los Pokémon, incluyendo información sobre su nombre, tipo, estadísticas y más. [Lista de datos](#datos-disponibles-de-los-pokémon)

## Ejecución del Proyecto
Para ejecutar el proyecto, siga estos pasos:

1. Asegúrese de que tenga Node.js instalado en su sistema.

2. Clone este repositorio en su máquina local.

3. Abra una terminal en el directorio raíz del proyecto.

4. Instale las dependencias del proyecto ejecutando el siguiente comando:
    ```git
    npm install
    ```

5. Ejecute el servidor GraphQL con el siguiente comando:
    ```git
    npm run dev
    ```

6. El servidor estará en funcionamiento y listo para recibir consultas GraphQL en la URL que se mostrará en la terminal.

## Consultas y Ejemplos
Puede realizar consultas GraphQL utilizando herramientas como GraphQL Playground o Postman. A continuación, se presentan algunos ejemplos de consultas que puede realizar:

### Obtener todos los Pokémon

```graphql
query {
  allPokemons {
    id
    name
    about
  }
}
```

### Buscar un Pokémon por nombre o ID

```graphql
query {
  findPokemon(name: "bulbasaur") {
    id
    name
    type
  }
}
```

### Filtrar Pokémon por tipo

```graphql
query {
  findPokemonsByType(type: "fire") {
    id
    name
  }
}
```

### Ordenar Pokémon por nombre

```graphql
query {
  allPokemons(order: "AZ") {
    id
    name
  }
}
```

### Obtener Pokémon por generación

```graphql
query {
  pokemonsByGeneration(generationName: "kanto") {
    id
    name
  }
}
```

### Filtrar y ordenar Pokémon de manera personalizada

```graphql
query {
  filteredPokemons(generationName: "kanto", type: "fire", sortBy: "maxCp", sortOrder: "DESC") {
    id
    name
    maxCp
  }
}
```

## Datos Disponibles de los Pokémon:

- **id:** Identificador único del Pokémon.

- **name:** Nombre del Pokémon.

- **generation:**
  - **num:** Número de la generación a la que pertenece el Pokémon.
  - **name:** Nombre de la región o generación a la que pertenece el Pokémon.

- **about:** Una descripción del Pokémon.

- **img:** URL de la imagen del Pokémon.

- **size:**
  - **height:** Altura del Pokémon.
  - **weight:** Peso del Pokémon.

- **pokemonRarity:** Rareza del Pokémon (por ejemplo, Normal).

- **type:** Tipos a los que pertenece el Pokémon (por ejemplo, Grass, Poison).

- **encounter:**
  - **baseFleeRate:** Probabilidad de que el Pokémon huya en un encuentro.
  - **baseCaptureRate:** Probabilidad de capturar al Pokémon.

- **spawnChance:** Probabilidad de encontrar al Pokémon en el juego.

- **stats:**
  - **baseAttack:** Poder de ataque base del Pokémon.
  - **baseDefense:** Poder de defensa base del Pokémon.
  - **baseStamina:** Poder de resistencia base del Pokémon.
  - **maxCp:** Puntuación de Combate máxima del Pokémon.
  - **maxHp:** Puntos de Salud máximos del Pokémon.

- **resistant** Tipos contra los cuales el Pokémon es resistente (por ejemplo, Water, Electric).

- **weaknesses:** Tipos contra los cuales el Pokémon es débil (por ejemplo, Fire, Ice).
- **quickMove:**
  - **name:** Nombre del movimiento rápido del Pokémon.
  - **type:** Tipo del movimiento rápido (por ejemplo, Grass).
  - **baseDamage:** Daño base del movimiento rápido.
  - **energy:** Energía requerida para usar el movimiento rápido.
  - **moveDurationSeg:** Duración del movimiento rápido en segundos.

- **specialAttack:**
  - **name:** Nombre del ataque especial del Pokémon.
  - **type:** Tipo del ataque especial (por ejemplo, Poison).
  - **baseDamage:** Daño base del ataque especial.
  - **energy:** Energía requerida para usar el ataque especial.
  - **moveDurationSeg:** Duración del ataque especial en segundos.

- **egg:** Tipo de huevo en el que puede encontrarse el Pokémon (por ejemplo, 2 km).

- **buddyDistanceKm:** Distancia en kilómetros que debes recorrer con el Pokémon como compañero para obtener caramelos.

- **evolution:**
  - **candy:** Cantidad de caramelos necesarios para evolucionar al Pokémon.
  - **prevEvolution:** Datos de la evolución anterior, si la hubiera.
      - **num:** Número de la evolución previa.
      - **name:** Nombre de la evolución previa.
      - **candyCost:** Cantidad de caramelos necesarios para esta evolución.
  - **nextEvolution:** Datos de la evolución siguiente, si la hubiera.
    - **num:** Número de la evolución siguiente.
    - **name:** Nombre de la evolución siguiente.
    - **candyCost:** Cantidad de caramelos necesarios para esta evolución.

## ¡Diviértete explorando el mundo de los Pokémon a través de GraphQL!
Espero que este proyecto le ayude a entender cómo crear un servidor GraphQL y te permita explorar datos de Pokémon de una manera divertida.