import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PokemonList1 from './PokemonList/index1';
import PokemonList2 from './PokemonList/index2';
import PokemonList3 from './PokemonList/index3';
import PokemonDetailsScreen1 from './PokemonDetails/index1';
import PokemonDetailsScreen2 from './PokemonDetails/index2';

const defaultNavigationOptions = {
  headerTitle: 'Pokemons',
  cardStyle: { backgroundColor: 'white' },
};

// Demo with some data, using a ScrollView
const Demo1 = createStackNavigator(
  {
    Screen1: {
      screen: PokemonList1,
    },
    Screen2: {
      screen: PokemonDetailsScreen1,
    },
  },
  {
    initialRouteName: 'Screen1',
    defaultNavigationOptions,
  }
);

// Demo with some data, using a FlatList
const Demo2 = createStackNavigator(
  {
    Screen1: {
      screen: PokemonList2,
    },
    Screen2: {
      screen: PokemonDetailsScreen1,
    },
  },
  {
    initialRouteName: 'Screen1',
    defaultNavigationOptions,
  }
);

// Demo with ApolloClient
const Demo3 = createStackNavigator(
  {
    Screen1: {
      screen: PokemonList3,
    },
    Screen2: {
      screen: PokemonDetailsScreen2,
    },
  },
  {
    initialRouteName: 'Screen1',
    defaultNavigationOptions,
  }
);

export default createAppContainer(Demo3);
