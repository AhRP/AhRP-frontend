import { StackNavigator } from 'react-navigation';
import Home from 'src/screens/Home';
import Login from 'src/screens/Login';

//Stack Navigator includes backbutton in header to nevigate back to prvious screen on stack.
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