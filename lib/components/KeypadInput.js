var _jsxFileName='src/components/KeypadInput.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');











var _MaterialIcons=require('react-native-vector-icons/MaterialIcons');var _MaterialIcons2=_interopRequireDefault(_MaterialIcons);
var _actions=require('src/scan/actions');
var _reactRedux=require('react-redux');
var _reducer=require('src/scan/reducer');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}



var styles=_reactNative.StyleSheet.create({
defaultNum:{
color:'black',
textAlign:'center'},

padding:{
margin:40},

title:{
textAlign:'center',
marginTop:30,
marginRight:40,
marginLeft:40}});


var formatDollars=function formatDollars(amount){return numeral(amount).format('$0,0.00');};var
Calculator=function(_Component){_inherits(Calculator,_Component);
function Calculator(props){_classCallCheck(this,Calculator);var _this=_possibleConstructorReturn(this,(Calculator.__proto__||Object.getPrototypeOf(Calculator)).call(this,
props));
_this.state={



display:'',
amount:'0.00',
valid:true,
decimal:true};return _this;

}_createClass(Calculator,[{key:'calculate',value:function calculate(







display){
var nums=display.toString().split(' + ');


var total=nums.filter(function(x){return!(x===''||x==='.');}).map(function(x){return parseFloat(x);}).reduce(function(sum,value){return sum+value;},0).toFixed(2);

if(!!this.props.LimitCurrently&&parseFloat(this.props.LimitCurrently)<parseFloat(total)){
this.setState({
valid:false});


this.refs.calculationDisplay.scrollToEnd({animated:false});
}else{
this.setState({
valid:true});

}
if(nums.length!=1){

total=nums.slice(0,-1).filter(function(x){return!(x===''||x==='.');}).map(function(x){return parseFloat(x);}).reduce(function(sum,value){return sum+value;},0).toFixed(2);
}
this.changeAmounts(total);
}},{key:'addDisplay',value:function addDisplay(

btn){
if(btn==='.'){
this.setState({
decimal:false});

}
if(btn===' + '){
this.setState({
decimal:true});

}
var dsply=this.state.display+btn;
this.setState({
display:dsply});

this.refs.calculationDisplay.scrollToEnd({animated:false});
this.calculate(dsply);
}},{key:'backspaceDisplay',value:function backspaceDisplay()

{
var newLen=this.state.display.length-1;
var dsply=this.state.display.toString().substring(0,newLen);
if(this.state.display.toString().charAt(this.state.display.toString().length-1)=='.'){
this.setState({
decimal:true});

}
if(this.state.display.toString().charAt(this.state.display.toString().length-1)==' '){
var nums=this.state.display.split(' + ').filter(function(x){return!(x=='');});
if(nums[nums.length-1].toString().includes('.')){
this.setState({
decimal:false});

}
newLen=this.state.display.length-3;
dsply=this.state.display.toString().substring(0,newLen);
}else{
}
this.setState({
display:dsply});

this.refs.calculationDisplay.scrollToEnd({animated:false});
this.calculate(dsply);
}},{key:'clearDisplay',value:function clearDisplay()

{var _this2=this;var
allCheckTexts=this.props.allCheckTexts;

var alertTitle=allCheckTexts.ECHDMCMCALAlert01||"Are you sure?";
var alertDesc=allCheckTexts.ECHDMCMCALAlert02||"Are you sure you would like to clear your calculation? Your amount total will be set back to $ 0.00.";
var alertOpt1=allCheckTexts.ECHDMCMCALAlert03||"Cancel";
var alertOpt2=allCheckTexts.ECHDMCMCALAlert04||"Continue";
if(this.state.display.toString().length>15){
_reactNative.Alert.alert(
alertTitle,
alertDesc,
[
{text:alertOpt1},
{text:alertOpt2,
onPress:function onPress(){
if(!!global.auth['SessionToken']){
_this2.setState({display:'',valid:true,decimal:true});
_this2.changeAmounts('0.00');
}
}}]);



}else{
this.setState({
display:'',
valid:true,
decimal:true});

this.changeAmounts('0.00');
}
}},{key:'changeAmounts',value:function changeAmounts(

amt){
formatted=this.addCommas(amt);
this.setState({
amount:formatted});

}},{key:'addCommas',value:function addCommas(

amt){
return amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}},{key:'onSubmit',value:function onSubmit()

{

var nums=this.state.display.toString().split(' + ');
var total=nums.filter(function(x){return!(x===''||x==='.');}).map(function(x){return parseFloat(x);}).reduce(function(sum,value){return sum+value;},0).toFixed(2);

if(total>0){
this.changeAmounts(total);
this.props.updateExpectedTotal({Amount:total});
}


this.props.finishCalc();
}},{key:'onBtnPressed',value:function onBtnPressed(



input){
switch(input){
case'DONE':
return this.onSubmit();
case'backspace':
return this.backspaceDisplay();
case'CLR':
return this.clearDisplay();
default:
return this.addDisplay(input);}

}},{key:'normalize',value:function normalize(


size){
if(_reactNative.Platform.OS==='ios'){
return Math.round(_reactNative.PixelRatio.roundToNearestPixel(size));
}else{
return Math.round(_reactNative.PixelRatio.roundToNearestPixel(size))-2;
}
}},{key:'render',value:function render()

{var _this3=this;var _props=
this.props,expectedAmount=_props.expectedAmount,currentTotal=_props.currentTotal,ECHDColours=_props.ECHDColours,LimitText=_props.LimitText,LimitCurrently=_props.LimitCurrently,allCheckTexts=_props.allCheckTexts;

var screenWidth=this.props.screenWidth||_reactNative.Dimensions.get('window').width;
var screenHeight=this.props.screenHeight||_reactNative.Dimensions.get('window').height;

var text6=allCheckTexts.ECHDMCMMATText06||'Your Expected Total ';
var title=allCheckTexts.ECHDMCMCALText01||'Enter the total deposit amount you expect for this transaction.';
var usage=allCheckTexts.ECHDMCMCALText02||"If you already know your total you may enter it and press the DONE button to continue, otherwise you may use the ' + ' button to add your amounts and press the DONE button when you are completed.";
var error=allCheckTexts.ECHDMCMCALErrText01||'You will not be able to complete this transaction as it will exceed your limit.';
var text5=allCheckTexts.ECHDMCMMATText05||'Calculated Total ';
var white=ECHDColours.ECHDMCMWhiteBkgdCol||'#FFFFFF';
var defaultLine=screenHeight*0.07;
var txtwhite=ECHDColours.ECHDMCMWhiteTxtCol||'#FFFFFF';
var darkFont=ECHDColours.ECHDMCMPrimaryTxtCol||'#262626';
var red=ECHDColours.ECHDMCMErrorRedCol||'#981B1B';
var greyFont=ECHDColours.ECHDMCMGreyTxtCol||'#BFBFBF';
var greyblue=ECHDColours.ECHDMCMBlueBkgdCol||'#4E5D7A';
var lightgrey=ECHDColours.ECHDMCMGreyBkgdCol||'#F2F2F2';






var keyValues=_reactNative.Platform.select({
ios:
[
{color:'#FFFFFF',icon:'1',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'2',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'3',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'backspace',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:true},
{color:'#FFFFFF',icon:'4',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'5',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'6',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:' + ',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(50):this.normalize(30),fontWeight:'bold'}],enabled:this.state.valid&&!(this.state.display.toString().charAt(this.state.display.toString().length-1)==' ')},
{color:'#FFFFFF',icon:'7',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'8',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'9',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:false},
{color:'#FFFFFF',icon:'CLR',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(30):this.normalize(25),lineHeight:global.isATablet?50:30}],enabled:true},
{color:'#FFFFFF',icon:'0',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'.',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(40):this.normalize(30),fontWeight:'bold'}],enabled:this.state.valid&&this.state.decimal},
{color:'#FFFFFF',icon:'DONE',style:[styles.defaultNum,{fontSize:global.isATablet?this.normalize(30):this.normalize(20),lineHeight:global.isATablet?50:30}],enabled:this.state.valid}],

android:
[
{color:'#FFFFFF',icon:'1',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'2',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'3',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:' + ',style:[styles.defaultNum,{fontSize:this.normalize(30),fontWeight:'bold'}],enabled:this.state.valid&&!(this.state.display.toString().charAt(this.state.display.toString().length-1)==' ')},
{color:'#FFFFFF',icon:'4',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'5',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'6',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'.',style:[styles.defaultNum,{fontSize:this.normalize(30),fontWeight:'bold'}],enabled:this.state.valid&&this.state.decimal},
{color:'#FFFFFF',icon:'7',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'8',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'9',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'backspace',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:true},
{color:'#FFFFFF',icon:'CLR',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:true},
{color:'#FFFFFF',icon:'0',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:this.state.valid},
{color:'#FFFFFF',icon:'',style:[styles.defaultNum,{fontSize:this.normalize(25)}],enabled:false},
{color:'#FFFFFF',icon:'DONE',style:[styles.defaultNum,{fontSize:this.normalize(20),lineHeight:30}],enabled:this.state.valid}]});


return(
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'column',justifyContent:'space-between',flex:1,backgroundColor:white},__source:{fileName:_jsxFileName,lineNumber:274}},
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:[styles.title,{fontSize:global.isATablet?24:this.normalize(20),color:darkFont}],__source:{fileName:_jsxFileName,lineNumber:275}},title),
!(currentTotal==0)&&
_react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:277}},
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,allowFontScaling:false,style:[{padding:5,marginBottom:0,paddingBottom:0,textAlign:'center',fontWeight:'bold'},{color:parseFloat(this.state.amount).toFixed(2)===parseFloat(currentTotal).toFixed(2)?darkFont:red,fontSize:global.isATablet?24:this.normalize(15)}],__source:{fileName:_jsxFileName,lineNumber:278}},text5,' : ',formatDollars(currentTotal)),
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,allowFontScaling:false,style:[{padding:5,paddingBottom:0,paddingTop:0,textAlign:'center'},{color:parseFloat(this.state.amount).toFixed(2)===parseFloat(currentTotal).toFixed(2)?darkFont:red,fontSize:global.isATablet?24:this.normalize(15)}],__source:{fileName:_jsxFileName,lineNumber:279}},text6,' : ',formatDollars(expectedAmount))),

!!LimitText&&_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,allowFontScaling:false,style:{textAlign:'center',fontSize:global.isATablet?20:this.normalize(12),fontStyle:'italic',margin:20,marginTop:5,marginBottom:0,color:greyFont},__source:{fileName:_jsxFileName,lineNumber:281}},'(',LimitText,')'),
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:{color:darkFont,fontSize:global.isATablet?this.state.display===''?60:70:this.state.display===''?this.normalize(30):this.state.amount.toString().length<8?this.normalize(60):this.normalize(40),margin:this.state.display===''||!this.state.valid?10:30,textAlign:'center',alignSelf:'center',flex:1},__source:{fileName:_jsxFileName,lineNumber:282}},'$ ',this.state.amount),


this.state.display===''&&
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:{backgroundColor:greyblue,color:txtwhite,padding:14.5,fontSize:global.isATablet?22:this.normalize(14),textAlign:'center'},__source:{fileName:_jsxFileName,lineNumber:286}},
usage),




!this.state.valid&&
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:lightgrey},__source:{fileName:_jsxFileName,lineNumber:293}},
this.refs.calculationDisplay.scrollToEnd({animated:false}),
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:{backgroundColor:red,color:txtwhite,padding:14.5,fontSize:global.isATablet?24:this.normalize(15),textAlign:'center'},__source:{fileName:_jsxFileName,lineNumber:295}},
error)),



_react2.default.createElement(_reactNative.ScrollView,{style:{width:screenWidth,backgroundColor:lightgrey},ref:'calculationDisplay',__source:{fileName:_jsxFileName,lineNumber:300}},
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:{textAlign:'right',margin:screenHeight*.025,color:darkFont,fontSize:global.isATablet?26:this.normalize(15)},__source:{fileName:_jsxFileName,lineNumber:301}},this.state.display)),



_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#DDDDDD',width:screenWidth,height:screenHeight*.31,alignSelf:'flex-end',justifyContent:'space-between',flexDirection:'row',flexWrap:'wrap',paddingTop:3},__source:{fileName:_jsxFileName,lineNumber:305}},
keyValues.map(function(value){return(
_react2.default.createElement(_reactNative.TouchableOpacity,{key:value.icon,disabled:!value.enabled,style:{width:screenWidth/4*.98,height:screenHeight*.07,backgroundColor:value.enabled?value.color:'#CCCCCC',marginTop:2.5},onPress:_this3.onBtnPressed.bind(_this3,value.icon),__source:{fileName:_jsxFileName,lineNumber:307}},
_react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:308}},

value.icon.toString().length>4?

_react2.default.createElement(_reactNative.View,{style:{alignSelf:'center',marginTop:screenHeight*.015},__source:{fileName:_jsxFileName,lineNumber:312}},
_react2.default.createElement(_MaterialIcons2.default,{
color:'black',
name:value.icon,
size:global.isATablet?_this3.normalize(40):_this3.normalize(35),
style:[value.style,{}],__source:{fileName:_jsxFileName,lineNumber:313}})):



_react2.default.createElement(_reactNative.View,{style:{alignSelf:'center',paddingTop:value.icon==' + '||value.icon=='.'?0:screenHeight*.01},__source:{fileName:_jsxFileName,lineNumber:321}},
_react2.default.createElement(_reactNative.Text,{allowFontScaling:false,style:[value.style],__source:{fileName:_jsxFileName,lineNumber:322}},
value.icon)))));}))));









}}]);return Calculator;}(_react.Component);