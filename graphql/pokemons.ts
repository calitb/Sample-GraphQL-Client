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
      id
      name
      image
      nickname
      classification
    }
  }
`;

export const getPokemonQuery = (options: QueryHookOptions<GetPokemonResponse, GetPokemonPayload>) => useQuery(GET_POKEMON, options);

/************** update nickname **************/

interface SetNicknamePayload {
  id: string;
  nickname?: string;
}

interface SetNicknameResponse {
  setNickname: Pokemon;
}

const SET_NICKNAME = gql`
  mutation SET_NICKNAME($id: ID!, $nickname: String!) {
    setNickname(id: $id, nickname: $nickname) {
      id
      name
      image
      nickname
      classification
    }
  }
`;

export const setNicknameMutation = (options: MutationHookOptions<SetNicknameResponse, SetNicknamePayload>) => useMutation(SET_NICKNAME, options);
