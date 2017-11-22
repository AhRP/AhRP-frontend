Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _jsxFileName='src/screens/Home.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Home=function(_Component){_inherits(Home,_Component);
function Home(props){_classCallCheck(this,Home);return _possibleConstructorReturn(this,(Home.__proto__||Object.getPrototypeOf(Home)).call(this,
props));

}_createClass(Home,[{key:'render',value:function render()

{var
navigation=this.props.navigation;

return(
_react2.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:16}},
_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:17}},'Open up App.js to start working on your app!'),
_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:18}},'Changes you make will automatically reload.'),
_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:19}},'Shake your phone to open the developer menu.'),
_react2.default.createElement(_reactNative.Button,{
onPress:function onPress(){return navigation.navigate('Login');},
title:'Back',__source:{fileName:_jsxFileName,lineNumber:20}})));



}}]);return Home;}(_react.Component);exports.default=Home;


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'#fff',
alignItems:'center',
justifyContent:'center'}});