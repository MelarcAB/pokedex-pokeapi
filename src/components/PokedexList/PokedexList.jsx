import React from "react";
import { getPokemonList } from '../../api/api';
import PokedexItem from '../PokedexItem/PokedexItem';



const PokedexList = () => {
    const [pokemonList, setPokemonList] = React.useState([]);

    React.useEffect(() => {
        const fetchPokemonList = async () => {
            const data = await getPokemonList();
            setPokemonList(data);
        };
        fetchPokemonList();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pokemonList.map((pokemon, index) => (
                <PokedexItem key={index} pokemon={pokemon} />
            ))}
        </div>
    );

}

export default PokedexList;