/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Home from './src/pages/Home'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({ uri: 'https://nx9zvp49q7.lp.gql.zone/graphql' });

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );
  }
}