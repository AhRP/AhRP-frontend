import { StackNavigator } from 'react-navigation';
import Home from 'src/screens/Home';
import Login from 'src/screens/Login';

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Login',
		},
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
});

export default RootNavigator;