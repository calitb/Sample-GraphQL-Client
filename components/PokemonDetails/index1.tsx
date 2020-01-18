/*

Receives the full pokemon object via navigation params

*/

import React from 'react';
import PokemonCard from '../PokemonCard';
import { Pokemon } from '../types';
import { SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface NavigationParams {
  pokemon: Pokemon;
}

interface PokemonDetailsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function PokemonDetailsScreen(props: PokemonDetailsScreenProps) {
  const pokemon = props.navigation.getParam('pokemon');
  return (
    <SafeAreaView>
      <PokemonCard pokemon={pokemon} />
    </SafeAreaView>
  );
}
