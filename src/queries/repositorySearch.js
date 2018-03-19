import gql from 'graphql-tag'

const REPOSITORY_SEARCH_QUERY = gql`
  query search($query: String!, $first: Int) {
    search(query: $query, first: $first, type: REPOSITORY) {
      edges {
        cursor
        textMatches {
          fragment
          property
          highlights {
            beginIndice
            endIndice
            text
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
      userCount
    }
  }
`
export default REPOSITORY_SEARCH_QUERY
