import React from 'react'
import { ApolloProvider } from 'react-apollo'

import configureApollo from './src/config/configureApollo'
import MainNavigator from './src/components/MainNavigator'

const { client } = configureApollo()

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
