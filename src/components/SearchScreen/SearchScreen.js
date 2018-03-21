import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import REPOSITORY_SEARCH_QUERY from '../../queries/repositorySearch'

const Root = styled.View`
  flex: 1;
  margin-horizontal: 15;
`

const SearchInputContainer = styled.View`
  width: 100%;
  height: 60;
  margin-vertical: 16;
  padding-vertical: 16;
  padding-horizontal: 10;
  border-width: 2;
  border-color: blue;
  border-radius: 10;
  justify-content: center;
`

const SearchInput = styled.TextInput`
  font-size: 16;
`

const SearchResultText = styled.Text.attrs({
  numberOfLines: 2,
  elipsizeMode: 'tail',
})`
  font-size: 16;
  padding-horizontal: 10;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100;
  margin-bottom: 10;
  background-color: #d9def8;
  border-radius: 10;
`

class SearchScreen extends Component {
  state = {
    inputValue: '',
    searchText: null,
  }

  handleOutsidePress = () => Keyboard.dismiss()

  handleTextChange = value => this.setState({ inputValue: value })

  handleSearchSubmit = () =>
    this.setState(prevState => ({ searchText: prevState.inputValue }))

  keyExtractor = item => `${item.node.owner.login}/${item.node.name}`

  handleEndReached = ({ data, networkStatus, fetchMore }) => {
    if (networkStatus >= 7 && data.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.search.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => ({
          ...previousResult,
          ...fetchMoreResult,
          search: {
            ...previousResult.search,
            ...fetchMoreResult.search,
            edges: [
              ...previousResult.search.edges,
              ...fetchMoreResult.search.edges,
            ],
          },
        }),
      })
    }
  }

  renderItem = ({ item: edge }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('UserDetails', {
          owner: edge.node.owner,
        })
      }
    >
      <Row>
        <SearchResultText>{edge.node.name}</SearchResultText>
        <SearchResultText>{edge.node.owner.login}</SearchResultText>
      </Row>
    </TouchableOpacity>
  )

  render() {
    const { inputValue, searchText } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.handleOutsidePress}>
        <Root>
          <SearchInputContainer>
            <SearchInput
              value={inputValue}
              placeholder="Enter search"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="search"
              maxLength={50}
              autoFocus
              blurOnSubmit
              onSubmitEditing={this.handleSearchSubmit}
              onChangeText={this.handleTextChange}
            />
          </SearchInputContainer>
          {searchText && (
            <Query
              query={REPOSITORY_SEARCH_QUERY}
              variables={{
                query: `${searchText} in:name`,
                first: 20,
                after: null,
              }}
            >
              {({ data, networkStatus, error, fetchMore }) => {
                if (networkStatus === 1) {
                  return <ActivityIndicator size="large" />
                }
                if (error) {
                  return <SearchResultText>{error.message}</SearchResultText>
                }
                return (
                  <FlatList
                    data={data.search.edges}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    onEndReached={() =>
                      this.handleEndReached({ data, networkStatus, fetchMore })
                    }
                    onEndReachedThreshold={0.9}
                  />
                )
              }}
            </Query>
          )}
        </Root>
      </TouchableWithoutFeedback>
    )
  }
}

export default SearchScreen
