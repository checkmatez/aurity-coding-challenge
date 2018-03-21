import React, { Component } from 'react'
import styled from 'styled-components'

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

const Text = styled.Text`
  font-size: 16;
  padding-horizontal: 10;
`

class UserDetailsScreen extends Component {
  render() {
    const owner = this.props.navigation.getParam('owner')
    return (
      <Root>
        <Row>
          <Avatar source={{ uri: owner.avatarUrl }} />
          <Text>{`Login: ${owner.login}`}</Text>
        </Row>
        <Text>{owner.bio ? owner.bio : owner.description}</Text>
      </Root>
    )
  }
}

export default UserDetailsScreen
