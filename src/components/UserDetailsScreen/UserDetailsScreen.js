import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Image,
} from 'react-native'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import uniqBy from 'lodash/uniqBy'

import REPOSITORY_SEARCH_QUERY from '../../queries/repositorySearch'

const Root = styled.View`
  flex: 1;
  margin-horizontal: 15;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 15;
`

const Avatar = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 150;
  height: 150;
`

class UserDetailsScreen extends Component {
  render() {
    const owner = this.props.navigation.getParam('owner')
    return (
      <Root>
        <Row>
          <Avatar source={{ uri: owner.avatarUrl }} />
          <Text>{owner.login}</Text>
        </Row>
        <Text>{owner.bio ? owner.bio : owner.description}</Text>
      </Root>
    )
  }
}

export default UserDetailsScreen
