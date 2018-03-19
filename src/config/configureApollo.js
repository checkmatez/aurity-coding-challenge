import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { GRAPHQL_ENDPOINT } from '../config/constants'

const configureApollo = () => {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers, ...rest }) => ({
      ...rest,
      headers: {
        ...headers,
        // authorization: accessToken,
      },
    }))
    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  })

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  })

  return { client }
}

export default configureApollo
