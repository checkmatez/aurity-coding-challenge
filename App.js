import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'

import configureApollo from './src/config/configureApollo'
import MainNavigator from './src/components/MainNavigator'

const { client } = configureApollo()

const Root = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: 'center';
  justify-content: 'center';
`

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainNavigator />
      </ApolloProvider>
    )
  }
}

export default App
