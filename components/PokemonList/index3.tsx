/*

Renders in a FlatList elements coming from a Apollo Server

*/

import React from 'react';
import PokemonCard from '../PokemonCard';
import { FlatList, SafeAreaView } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { getPokemonsQuery } from '../../graphql/pokemons';
import { Pokemon } from '../types';

interface PokemonListScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function PokemonListScreen(props: PokemonListScreenProps) {
  const { loading, data, error } = getPokemonsQuery({
    variables: {},
  });

  function onPressHandler(pokemon: Pokemon) {
    props.navigation.navigate('Screen2', { id: pokemon.id });
  }

  function renderPokemon(pokemon: Pokemon) {
    return <PokemonCard key={pokemon.id} pokemon={pokemon} onPress={onPressHandler} />;
  }

  return <SafeAreaView>{data?.pokemons && <FlatList data={data?.pokemons} keyExtractor={pokemon => pokemon.id} renderItem={({ item: pokemon }) => renderPokemon(pokemon)} />}</SafeAreaView>;
}
