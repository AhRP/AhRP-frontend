import { StackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native'
import Home from 'src/screens/Home';
import Login from 'src/screens/Login';
import Signup from 'src/screens/Signup';

//Stack Navigator includes backbutton in header to nevigate back to prvious screen on stack.
const RootNavigator = StackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerTitle: 'Create an Account',
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
  },
);

export default RootNavigator;