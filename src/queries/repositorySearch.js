import gql from 'graphql-tag'

const REPOSITORY_SEARCH_QUERY = gql`
  query search($query: String!, $first: Int, $after: String) {
    search(query: $query, first: $first, after: $after, type: REPOSITORY) {
      edges {
        cursor
        textMatches {
          property
          fragment
        }
        node {
          ... on Repository {
            id
            name
            description
            owner {
              id
              avatarUrl
              login
              ... on User {
                id
                bio
              }
              ... on Organization {
                id
                description
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  }
`
export default REPOSITORY_SEARCH_QUERY
