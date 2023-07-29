import React from "react";
import { Search } from '@mui/icons-material'
import { searchPokemonByName } from '../../api/api';

const SearchBar = ({ setQuery, setOffset, setPokemonList }) => {
    const handleSearch = async (event) => {
        const query = event.target.value;
        setQuery(query);
        if (query) {
            const result = await searchPokemonByName(query);
            if (result) {
                setPokemonList([result]);
            } else {
                setPokemonList([]);
            }
        } else {
            // Vuelve a cargar la lista de Pokémon si la consulta está vacía
            const newPokemonList = await getPokemonList(0, 20);
            setPokemonList(newPokemonList);
            setOffset(20);

        }
    };

    return (
        <div className="w-full flex items-center bg-white rounded-md shadow-lg px-4 py-2">
            <span className="material-icons md-18 text-gray-500 mr-2">
                <Search />
            </span>
            <input className="w-full p-2 focus:outline-none" type="text" placeholder="Search Pokemon..." onChange={handleSearch} />
        </div>
    );
};

export default SearchBar;
