import React from "react";
import { getPokemonList } from '../../api/api';
import PokedexItem from '../PokedexItem/PokedexItem';

import { useEffect, useState } from 'react';


const PokedexList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
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

    return (
        <div className="flex flex-wrap justify-center p-4">
            {pokemonList.map((pokemon, index) => (
                <PokedexItem key={index} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default PokedexList;