Object.defineProperty(exports,"__esModule",{value:true});var _reactNavigation=require('react-navigation');
var _Home=require('src/screens/Home');var _Home2=_interopRequireDefault(_Home);
var _Login=require('src/screens/Login');var _Login2=_interopRequireDefault(_Login);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}


var RootNavigator=(0,_reactNavigation.StackNavigator)({
Login:{
screen:_Login2.default,
navigationOptions:{
headerTitle:'Login'}},


Home:{
screen:_Home2.default,
navigationOptions:{
headerTitle:'Home'}}});exports.default=




RootNavigator;