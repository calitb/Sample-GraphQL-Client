import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 75,
    height: 75,
  },
  textContainer: {
    alignContent: 'center',
  },
  text: {
    alignItems: 'center',
    fontSize: 34,
    marginLeft: 10,
  },
  subtext: {
    alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
});

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: (pokemon: Pokemon) => void;
}

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(pokemon)}>
      <Image style={styles.image} source={{ uri: pokemon.image }} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{pokemon.name}</Text>
        {pokemon.classification && <Text style={styles.subtext}>Classification: {pokemon.classification}</Text>}
      </View>
    </TouchableOpacity>
  );
}
