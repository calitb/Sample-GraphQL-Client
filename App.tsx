import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import AppNavigationContainer from './components/routes';

import { getClient } from './graphql/apollo';
const client = getClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigationContainer />
    </ApolloProvider>
  );
}
