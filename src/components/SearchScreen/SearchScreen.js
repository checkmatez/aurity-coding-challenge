import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import REPOSITORY_SEARCH_QUERY from '../../queries/repositorySearch'

const Container = styled.ScrollView`
  flex: 1;
`

const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: 'white',
  selectionColor: 'white',
  // android only
  underlineColorAndroid: 'transparent',
  textBreakStrategy: 'highQuality',
})`
  width: 100%;
  height: 120;
  padding-vertical: 16;
  padding-horizontal: 26;
  /* background-color: 'red'; */
  font-size: 16;
  /* color: 'white'; */
`

const SearchResultText = styled.Text`
  /* color: 'blue'; */
  font-size: 16;
`

export class SearchScreen extends Component {
  state = {
    inputValue: '',
    searchText: null,
  }

  handleOutsidePress = () => Keyboard.dismiss()

  handleTextChange = value => this.setState({ inputValue: value })

  handleSearchSubmit = () =>
    this.setState(prevState => ({ searchText: prevState.inputValue }))

  checkValidation = () => {
    return true
  }

  keyExtractor = item => item.cursor

  handleEndReached = () => {}

  renderItem = edge => {
    return <SearchResultText>{edge.textMatches[0].fragment}</SearchResultText>
  }

  render() {
    const { inputValue, searchText } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.handleOutsidePress}>
        <Container>
          <SearchInput
            value={inputValue}
            placeholder="Enter search"
            keyboardType="default"
            returnKeyType="search"
            maxLength={50}
            autoFocus
            blurOnSubmit
            onSubmitEditing={this.handleSearchSubmit}
            onChangeText={this.handleTextChange}
          />
          {searchText && (
            <Query
              query={REPOSITORY_SEARCH_QUERY}
              variables={{ query: searchText, first: 10 }}
            >
              {({ data, loading, error }) => {
                if (loading) {
                  return <ActivityIndicator size="large" />
                }
                if (error) {
                  return <SearchResultText>{error.message}</SearchResultText>
                }
                console.log('search text = ', searchText)
                console.log(data)
                return (
                  <FlatList
                    data={data.search.edges}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    // refreshControl={refreshControl}
                    onEndReached={this.handleEndReached}
                    onEndReachedThreshold={0.9}
                  />
                )
              }}
            </Query>
          )}
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

export default SearchScreen
