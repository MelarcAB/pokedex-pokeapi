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
        <div className="bg-red-600 m-3 p-5 rounded-md shadow-lg text-white flex flex-col items-center">
            <div className="flex items-center justify-center bg-red-600 m-3 p-5 rounded-md shadow-lg text-white">

                <h1 className="text-4xl font-bold">{poke_name}</h1>
            </div>

            <PokemonImage
                src={pokemonDetails.sprites?.other["official-artwork"].front_default}
                alt={poke_name}
                type={pokemonDetails.types?.[0]?.type.name}  // Usando el operador opcional de encadenamiento.
            />
            <h2 className="mt-5 text-2xl font-semibold">Types</h2>
            <div className="flex flex-wrap justify-center">
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
        <img
            className={`mt-3 w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg ${color}`}
            src={src}
            alt={alt}
        />
    );
}


export default PokedexItem;
