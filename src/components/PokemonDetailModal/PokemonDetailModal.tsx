import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonDetail } from '../../hooks/useGetPokemonDetail';
import { createUseStyles } from 'react-jss';

export const PokemonDetailModal: React.FC = () => {
  const classes = useStyles();
  const { id , name} = useParams<{ id: string , name: string}>();
  const navigate = useNavigate();
  if (!id || !name) {
    navigate('/pokemon'); // Navigate back to list page
    return null;
  }
  const { pokemon, loading, error } = useGetPokemonDetail(id,name);

  const handleClose = () => {
    navigate('/pokemon'); // Close the modal and navigate back to the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details</div>;

  return (
    <Dialog open={!!id}>
      <DialogTitle>{pokemon?.name}</DialogTitle>
      <DialogContent>
      <div className={classes.imageContainer}>
          <img src={pokemon?.image} alt={pokemon?.name} />
      </div>
        <div className={classes.details}>
        <div>Classification: {pokemon?.classification}</div>
        <div>Types: {pokemon?.types.join(', ')}</div>
        <div>Weaknesses: {pokemon?.weaknesses.join(', ')}</div>
        <div>Max CP: {pokemon?.maxCP}</div>
        <div>Max HP: {pokemon?.maxHP}</div>
      </div>
      </DialogContent>
       <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = createUseStyles({
  imageContainer: {
    textAlign: 'center',
    marginBottom: '16px',
    '& img': {
      maxWidth: '200px',
      borderRadius: '8px',
    },
  },
  details: {
    color: '#333',
    fontSize: '16px',
    '& div': {
      marginBottom: '8px',
      color: '#333',
      fontSize: '16px',
    },
  },
  dialogTitle: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'center',
  },
  dialogContent: {
    backgroundColor: '#fff',
  },
});
