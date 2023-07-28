import React, { useEffect, useState, useMemo } from "react";
import { getPokemonDetailsByName } from '../../api/api';

const typeToLabelMap = {
    "grass": "Grass",
    "poison": "Poison",
    "fire": "Fire",
    "flying": "Flying",
    "water": "Water",
    "bug": "Bug",
    "normal": "Normal",
    "electric": "Electric",
    "ground": "Ground",
    "fairy": "Fairy",
    "fighting": "Fighting",
    "psychic": "Psychic",
    "rock": "Rock",
    "steel": "Steel",
    "ice": "Ice",
    "ghost": "Ghost",
    "dragon": "Dragon",
    "dark": "Dark",
};

const typeToColorMap = {
    "grass": "bg-green-600",
    "poison": "bg-purple-500",
    "fire": "bg-red-500",
    "flying": "bg-blue-200",
    "water": "bg-blue-500",
    "bug": "bg-green-400",
    "normal": "bg-gray-300",
    "electric": "bg-yellow-500",
    "ground": "bg-yellow-700",
    "fairy": "bg-pink-500",
    "fighting": "bg-red-500",
    "psychic": "bg-pink-500",
    "rock": "bg-gray-500",
    "steel": "bg-gray-500",
    "ice": "bg-blue-500",
    "ghost": "bg-purple-500",
    "dragon": "bg-red-500",
    "dark": "bg-gray-500",
};

const PokedexItem = ({ pokemon }) => {
    const poke_name = useMemo(() => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), [pokemon.name]);

    const [pokemonDetails, setPokemonDetails] = useState([]);
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const data = await getPokemonDetailsByName(pokemon.name);
            setPokemonDetails(data);
        };
        fetchPokemonDetails();
    }, [pokemon.name]);

    return (
        <div className="w-64 sm:w-72 lg:w-80 bg-red-600 mx-2 my-4 p-4 rounded-lg shadow-lg text-white flex flex-col items-center overflow-hidden">
            <div className="bg-red-700 w-full p-3 rounded-t-lg shadow-inner flex items-center justify-center">
                <img
                    className="w-10 h-10 object-cover mr-2"
                    src={pokemonDetails.sprites?.front_default}
                    alt={`${poke_name} sprite`}
                />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold truncate">{poke_name}</h1>
            </div>

            <PokemonImage
                src={pokemonDetails.sprites?.other["official-artwork"].front_default}
                alt={poke_name}
                type={pokemonDetails.types?.[0]?.type.name}
            />

            <h2 className="mt-3 text-xl sm:text-2xl font-semibold mb-2">Types</h2>
            <div className="flex flex-wrap justify-center mb-2">
                {pokemonDetails.types?.map((type, index) => (
                    <div key={index} className="m-1">
                        {TypeLabel(type.type.name)}
                    </div>
                ))}
            </div>
        </div>
    );


};

function TypeLabel(type) {
    const label = typeToLabelMap[type] || "Normal";
    const color = typeToColorMap[type] || "bg-gray-500";

    return <span className={`${color} rounded-md p-1 inline-block text-white`}>{label}</span>;
}

function PokemonImage({ src, alt, type }) {
    const color = typeToColorMap[type] || "bg-gray-500";

    return (
        <div className={`mt-3 w-40 sm:w-48 lg:w-56 h-40 sm:h-48 lg:h-56 rounded-full overflow-hidden p-5 ${color}`}>
            <img className="w-full h-full object-cover" src={src} alt={alt} />
        </div>
    );
}


export default PokedexItem;
