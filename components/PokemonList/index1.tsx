/*

Renders elements from a mock in a ScrollView using array.map()

*/

import React from 'react';
import PokemonCard from '../PokemonCard';
import pokemons from './mockup';
import { ScrollView, SafeAreaView } from 'react-native';
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
      <ScrollView>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onPress={onPressHandler} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
