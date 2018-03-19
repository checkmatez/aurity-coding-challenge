import { StackNavigator } from 'react-navigation'

import SearchScreen from '../SearchScreen'
// import DisputesByMatchScreen from '../../Screens/DisputesByMatchScreen'

const MainNavigator = StackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
        title: `Search`,
      }),
    },
  },
  {
    initialRouteName: 'Search',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'grey',
      },
    }),
  }
)

export default MainNavigator
