import { QueryHookOptions, MutationHookOptions, useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Pokemon } from '../components/types';

/************** pokemons **************/

interface GetPokemonsPayload {}

interface GetPokemonsResponse {
  pokemons: Pokemon[];
}

const GET_POKEMONS = gql`
  query GET_POKEMONS {
    pokemons {
      id
      name
      image
    }
  }
`;

export const getPokemonsQuery = (options: QueryHookOptions<GetPokemonsResponse, GetPokemonsPayload>) => useQuery(GET_POKEMONS, options);

/************** pokemon **************/

interface GetPokemonPayload {
  id: string;
}

interface GetPokemonResponse {
  pokemon: Pokemon;
}

const GET_POKEMON = gql`
  query GET_POKEMON($id: ID!) {
    pokemon(id: $id) {
      name
      image
      nickname
      classification
    }
  }
`;

export const getPokemonQuery = (options: QueryHookOptions<GetPokemonResponse, GetPokemonPayload>) => useQuery(GET_POKEMON, options);

/************** update nickname **************/

interface AddNicknamePayload {
  id: string;
  nickname?: string;
}

interface AddNicknameResponse {
  pokemon: Pokemon;
}

const ADD_NICKNAME = gql`
  mutation ADD_NICKNAME($id: ID!, $nickname: String!) {
    addNickname(id: $id, nickname: $nickname) {
      name
      image
      nickname
      classification
    }
  }
`;

export const addNicknameMutation = (options: MutationHookOptions<AddNicknameResponse, AddNicknamePayload>) => useMutation(ADD_NICKNAME, options);
