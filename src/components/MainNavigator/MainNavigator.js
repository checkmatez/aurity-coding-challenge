import { StackNavigator } from 'react-navigation'

import SearchScreen from '../SearchScreen'
import UserDetailsScreen from '../UserDetailsScreen'

const MainNavigator = StackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
        title: `Search`,
      }),
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('owner').login,
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
  }
)

export default MainNavigator
