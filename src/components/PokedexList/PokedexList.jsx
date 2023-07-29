import React, { useState, useEffect } from "react";
import { getPokemonList } from '../../api/api';
import PokedexItem from '../PokedexItem/PokedexItem';
import SearchBar from '../SearchBar/SearchBar';

const PokedexList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [query, setQuery] = useState('');
    const limit = 20;

    const loadMorePokemon = async () => {
        const newPokemonList = await getPokemonList(offset, limit);
        setPokemonList(prevPokemonList => [...prevPokemonList, ...newPokemonList]);
        setOffset(prevOffset => prevOffset + limit);
    };

    useEffect(() => {
        loadMorePokemon();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMorePokemon();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset, limit]);

    const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex flex-col w-full px-4 py-2 min-h-screen">
            <SearchBar setQuery={setQuery} setPokemonList={setPokemonList} setOffset={setOffset} />

            <div className="flex flex-wrap justify-center w-full mt-4">
                {filteredPokemonList.map((pokemon, index) => (
                    <PokedexItem
                        className="animate-fade-down animate-infinite"
                        key={index} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );



}

export default PokedexList;
