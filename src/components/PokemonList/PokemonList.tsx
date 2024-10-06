import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const navigate = useNavigate();

  const handleItemClick = (id: string, name: string) => {
    navigate(`/pokemon/${id}/${name}`);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPokemons = pokemons.filter(pkmn => pkmn.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className={classes.root}>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search Pokémon" 
        className={classes.searchBox} 
      />
      {loading && <div>Loading...</div>}
      {filteredPokemons.map((pkmn) => (
        <div key={pkmn.id} className={classes.listItem} onClick={() => handleItemClick(pkmn.id, pkmn.name)}>
          <img src={pkmn.image} alt={pkmn.name} className={classes.image} />
          <div>{pkmn.name} #{pkmn.number}</div>
          <div>{pkmn.types.join(', ')}</div>
        </div>
      ))}

    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    listItem: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#888',
      },
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      width: '50px',
      height: '50px',
      marginRight: '16px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(2.05)',
        backgroundColor: '#f5f5f5',
      },
    },
    searchBox: {
      padding: '8px',
      marginBottom: '16px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      color: '#333',
      '&::placeholder': {
        color: '#888',
      },
    },    
  },
  { name: 'PokemonList' }
);
