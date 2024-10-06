import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

interface PokemonDetail {
    id: string;
    name: string;
    image: string;
    classification: string;
    types: string[];
    weaknesses: string[];
    maxCP: number;
    maxHP: number;
  }
  
  interface PokemonDetailData {
    pokemon: PokemonDetail;
  }
  
  interface PokemonDetailVars {
    id: string;
    name: string;
  }
  

export const GET_POKEMON_DETAIL = gql`
    query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
        id
        number
        name
        weight{
        minimum
        maximum
        }
        height{
        minimum
        maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
    }
    }
`;

export const useGetPokemonDetail = (id: string, name: string) => {
    const { data, loading, error } = useQuery<PokemonDetailData, PokemonDetailVars>(GET_POKEMON_DETAIL, {
    variables: { id , name},
    });

    return {
    pokemon: data?.pokemon,
    loading,
    error,
    };
};