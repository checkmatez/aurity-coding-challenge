import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

import { GRAPHQL_ENDPOINT, GITHUB_TOKEN } from '../config/constants'

// Github API uses interfaces and unions,
// so we have to introspect schema at build time
// https://www.apollographql.com/docs/react/recipes/fragment-matching.html
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const configureApollo = () => {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers, ...rest }) => ({
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }))
    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  })

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache({ fragmentMatcher }),
  })

  return { client }
}

export default configureApollo
