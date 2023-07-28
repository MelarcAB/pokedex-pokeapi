const POKEAPI_URL = import.meta.env.VITE_POKEAPI_URL;

export const getPokemonList = async (offset = 0, limit = 20) => {
    const response = await fetch(`${POKEAPI_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
};


export const getPokemonDetails = async (pokemonId) => {
    const response = await fetch(`${POKEAPI_URL}/pokemon/${pokemonId}`);
    return await response.json();
};
export const getPokemonDetailsByName = async (pokemonName) => {
    const response = await fetch(`${POKEAPI_URL}/pokemon/${pokemonName}`);
    return await response.json();
};
