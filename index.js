import { AppRegistry, Dimensions } from 'react-native';
import App from 'src/App';

({ height: global.height, width: global.width } = Dimensions.get('window'));

AppRegistry.registerComponent('AhRP', () => App);
