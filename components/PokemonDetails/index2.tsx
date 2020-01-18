/*

Receives the pokemon id via navigation params and fetch the pokemon info from graphql

*/

import React, { useState } from 'react';
import PokemonCard from '../PokemonCard';
import { Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { addNicknameMutation, getPokemonQuery } from '../../graphql/pokemons';

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    flex: 1,
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

interface NavigationParams {
  id: string;
}

interface PokemonDetailsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function PokemonDetailsScreen(props: PokemonDetailsScreenProps) {
  const pokemonId = props.navigation.getParam('id');
  const [nickname, setNickname] = useState<string | undefined>('');

  const { data, refetch } = getPokemonQuery({
    variables: { id: pokemonId },
    fetchPolicy: 'network-only',
    onCompleted: response => {
      setNickname(response.pokemon.nickname);
    },
  });

  const [saveNickname] = addNicknameMutation({
    onCompleted: () => {
      refetch();
    },
  });

  function onChangeText(text: string) {
    setNickname(text);
  }

  function onSavePressed() {
    saveNickname({ variables: { id: pokemonId, nickname } });
  }

  return (
    <SafeAreaView>
      {data && (
        <>
          <PokemonCard pokemon={data.pokemon} />
          <View style={styles.inputView}>
            <Text style={styles.text}>Nickname:</Text>
            <TextInput style={styles.input} onChangeText={onChangeText} value={nickname} />
            <TouchableOpacity style={styles.button} onPress={onSavePressed}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
