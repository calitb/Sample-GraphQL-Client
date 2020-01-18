/*

Renders elements from a mock in a FlatList

*/

import React from 'react';
import PokemonCard from '../PokemonCard';
import pokemons from './mockup';
import { FlatList, SafeAreaView } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Pokemon } from '../types';

interface PokemonListScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function PokemonListScreen(props: PokemonListScreenProps) {
  function onPressHandler(pokemon: Pokemon) {
    props.navigation.navigate('Screen2', { pokemon });
  }

  return (
    <SafeAreaView>
      <FlatList data={pokemons} keyExtractor={pokemon => pokemon.id} renderItem={({ item: pokemon }) => <PokemonCard key={pokemon.id} pokemon={pokemon} onPress={onPressHandler} />} />
    </SafeAreaView>
  );
}
