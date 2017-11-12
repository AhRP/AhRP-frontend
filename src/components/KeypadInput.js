import React, { Component } from 'react';
import {
    Alert,
    View,
    ScrollView,
    AppState,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.3.0
import { finishCalc, updateExpectedTotal } from 'src/scan/actions' //updateExpectedTotal,
import { connect } from 'react-redux';
import { calculatorInfo } from 'src/scan/reducer';

//Pasting my code I will clean up to make into component later.

const styles = StyleSheet.create({
    defaultNum: {
        color: 'black',
        textAlign: 'center',
    },
    padding: {
        margin: 40,
    },
    title: {
        textAlign: 'center',
        marginTop: 30,
        marginRight: 40,
        marginLeft: 40,
    },
})
const formatDollars = amount => numeral(amount).format('$0,0.00');
class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The equation being evaluated and the user entered.
            //(parseFloat(this.props.expectedAmount) === 0) ? '' : parseFloat(this.props.expectedAmount).toString(),
            //this.props.expectedAmount,
            display: '',
            amount: '0.00',
            valid: true,
            decimal: true,
        }
    }

    //Takes in display equation and calculates and updates the amoutn value.
    //Notification when user exceeds limit.
    //USER-ERROR: Entering more than two digits behind decimal.
    //USER-ERROR: No consecutive + or . or more than one . between +.
    //USER-ERROR: If last button they pressed was a ' + ' and display > 80 characters just turn into amount total. with + at end equal to display.
    //can use regex to test if number filter is regex complete. i.e. has 2 digit after decimal and already has one decimal. 
    calculate(display) {
        const nums = display.toString().split(' + ');
        //adds up all of the split numbers and formats them
        //louise
        let total = nums.filter((x) => !( (x === '')||(x === '.') )).map( (x) => parseFloat(x) ).reduce(function(sum, value) { return sum + value; }, 0).toFixed(2);
        
        if(!!this.props.LimitCurrently && (parseFloat(this.props.LimitCurrently) < parseFloat(total))) {
            this.setState({
                valid: false
            });
            //this.refs.calculationDisplay.scrollTo({x: 0, y: 0, animated: false});
            this.refs.calculationDisplay.scrollToEnd({animated: false});
        } else {
            this.setState({
                valid: true
            });
        }
        if (nums.length != 1) { 
            //louise: filtered total
            total = nums.slice(0, -1).filter((x) => !( (x === '')||(x === '.') )).map( (x) => parseFloat(x) ).reduce(function(sum, value) { return sum + value; }, 0).toFixed(2);
        }
        this.changeAmounts(total);
    }

    addDisplay(btn) {
        if (btn === '.') {
            this.setState({
                decimal: false
            })
        } 
        if (btn === ' + ') {
            this.setState({
                decimal: true
            })
        }
        const dsply = this.state.display + btn;
        this.setState({
            display: dsply
        });
        this.refs.calculationDisplay.scrollToEnd({animated: false});
        this.calculate(dsply);
    }

    backspaceDisplay() {
        let newLen = this.state.display.length - 1;
        let dsply = this.state.display.toString().substring(0, newLen);
        if(this.state.display.toString().charAt(this.state.display.toString().length-1) == '.') {
            this.setState({
                decimal: true
            })
        }
        if(this.state.display.toString().charAt(this.state.display.toString().length-1) == ' ') {
            const nums = this.state.display.split(' + ').filter((x) => !(x=='') );
            if (nums[nums.length-1].toString().includes('.')){
                this.setState({
                    decimal: false
                })
            }
            newLen = this.state.display.length - 3;
            dsply = this.state.display.toString().substring(0, newLen);
        } else {
        }
        this.setState({
            display: dsply
        })
        this.refs.calculationDisplay.scrollToEnd({animated: false});
        this.calculate(dsply);
    }

    clearDisplay() {
        const { allCheckTexts } = this.props;
        //ECHD Codes
        const alertTitle = allCheckTexts.ECHDMCMCALAlert01 || "Are you sure?";
        const alertDesc = allCheckTexts.ECHDMCMCALAlert02 || "Are you sure you would like to clear your calculation? Your amount total will be set back to $ 0.00.";
        const alertOpt1 = allCheckTexts.ECHDMCMCALAlert03 || "Cancel";
        const alertOpt2 = allCheckTexts.ECHDMCMCALAlert04 || "Continue";
        if (this.state.display.toString().length > 15) {
            Alert.alert(
                alertTitle,
                alertDesc,
                [
                    {text: alertOpt1},
                    {text: alertOpt2,
                        onPress: () => {
                            if(!!global.auth['SessionToken']){
                                this.setState({ display: '', valid: true, decimal: true, })
                                this.changeAmounts('0.00');
                            }
                        }
                    }
                ] 
            )
        } else {
            this.setState({
                display: '',
                valid: true,
                decimal: true,
            })
            this.changeAmounts('0.00');
        }
    }

    changeAmounts(amt) {
        formatted = this.addCommas(amt);
        this.setState({
            amount: formatted
        });
    }

    addCommas(amt) {
        return amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onSubmit() {
        //louise
        const nums = this.state.display.toString().split(' + ');
        const total = nums.filter((x) => !( (x === '')||(x === '.') )).map( (x) => parseFloat(x) ).reduce(function(sum, value) { return sum + value; }, 0).toFixed(2);
        //if you click done when you enter 0 amount it will not update your total.
        if (total > 0) {
            this.changeAmounts(total);
            this.props.updateExpectedTotal({Amount: total});
        }

        //this.props.updateExpectedTotal({Amount: this.state.amount});
        this.props.finishCalc();
    }

    //(value.icon.toString().length > 1) ? value.onPress : 
    //all buttons come here.
    onBtnPressed(input) {
        switch (input) {
            case 'DONE':
                return this.onSubmit()
            case 'backspace':
                return this.backspaceDisplay()
            case 'CLR':
                return this.clearDisplay()
            default:
                return this.addDisplay(input)
        }
    }

    //making fitting font... if istablet.
    normalize(size) {
        if (Platform.OS === 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(size))
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
        }
    }

    render() {
        const { expectedAmount, currentTotal, ECHDColours, LimitText, LimitCurrently, allCheckTexts } = this.props;

        const screenWidth = this.props.screenWidth || Dimensions.get('window').width;
        const screenHeight = this.props.screenHeight || Dimensions.get('window').height;
        //ECHD_CODES
        const text6 = allCheckTexts.ECHDMCMMATText06 || 'Your Expected Total ';
        const title = allCheckTexts.ECHDMCMCALText01 || 'Enter the total deposit amount you expect for this transaction.';
        const usage = allCheckTexts.ECHDMCMCALText02 || "If you already know your total you may enter it and press the DONE button to continue, otherwise you may use the ' + ' button to add your amounts and press the DONE button when you are completed.";
        const error = allCheckTexts.ECHDMCMCALErrText01 || 'You will not be able to complete this transaction as it will exceed your limit.';
        const text5 = allCheckTexts.ECHDMCMMATText05 || 'Calculated Total ';
        const white = ECHDColours.ECHDMCMWhiteBkgdCol || '#FFFFFF';
        const defaultLine = screenHeight * 0.07;
        const txtwhite = ECHDColours.ECHDMCMWhiteTxtCol || '#FFFFFF';
        const darkFont = ECHDColours.ECHDMCMPrimaryTxtCol || '#262626';
        const red = ECHDColours.ECHDMCMErrorRedCol || '#981B1B'
        const greyFont = ECHDColours.ECHDMCMGreyTxtCol || '#BFBFBF';
        const greyblue = ECHDColours.ECHDMCMBlueBkgdCol || '#4E5D7A';
        const lightgrey = ECHDColours.ECHDMCMGreyBkgdCol || '#F2F2F2';
        //this.addDisplay.bind(this) calls itself
        //backspace

        //const scale = screenWidth / 320; iphone 5
        //const scale = size => width / guidelineBaseWidth * size;
        
        const keyValues = Platform.select({
            ios:
                [
                {color: '#FFFFFF', icon: '1', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display, calculate, and update state of Calculator.
                {color: '#FFFFFF', icon: '2', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '3', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: 'backspace', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: true},
                {color: '#FFFFFF', icon: '4', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '5', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '6', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: ' + ', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(50) : this.normalize(30), fontWeight: 'bold'}], enabled: this.state.valid && !(this.state.display.toString().charAt(this.state.display.toString().length-1) == ' ')}, //on press icon to display
                {color: '#FFFFFF', icon: '7', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '8', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '9', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: false},
                {color: '#FFFFFF', icon: 'CLR', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(30) : this.normalize(25), lineHeight: global.isATablet ? 50 : 30} ], enabled: true},
                {color: '#FFFFFF', icon: '0', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '.', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(40) : this.normalize(30), fontWeight: 'bold'}], enabled: this.state.valid && this.state.decimal}, //on press icon to display
                {color: '#FFFFFF', icon: 'DONE', style: [styles.defaultNum, {fontSize: global.isATablet ? this.normalize(30) : this.normalize(20), lineHeight: global.isATablet ? 50 : 30}], enabled: this.state.valid}, //submit display, submit amount, grabbed this color from details page's green check.
                ],
            android: 
                [
                {color: '#FFFFFF', icon: '1', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display, calculate, and update state of Calculator.
                {color: '#FFFFFF', icon: '2', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '3', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: ' + ', style: [styles.defaultNum, {fontSize: this.normalize(30), fontWeight: 'bold'}], enabled: this.state.valid && !(this.state.display.toString().charAt(this.state.display.toString().length-1) == ' ')}, //on press icon to display
                {color: '#FFFFFF', icon: '4', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '5', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '6', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '.', style: [styles.defaultNum, {fontSize: this.normalize(30), fontWeight: 'bold'}], enabled: this.state.valid && this.state.decimal}, //on press icon to display
                {color: '#FFFFFF', icon: '7', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '8', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '9', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: 'backspace', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: true},
                {color: '#FFFFFF', icon: 'CLR', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: true},
                {color: '#FFFFFF', icon: '0', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: this.state.valid}, //on press icon to display
                {color: '#FFFFFF', icon: '', style: [styles.defaultNum, {fontSize: this.normalize(25)}], enabled: false},
                {color: '#FFFFFF', icon: 'DONE', style: [styles.defaultNum, {fontSize: this.normalize(20), lineHeight: 30}], enabled: this.state.valid}, //submit display, submit amount, grabbed this color from details page's green check. used to be check-circle
                ]
        });
        return (
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, backgroundColor: white}}>
                <Text allowFontScaling={false} style={[styles.title, {fontSize: global.isATablet ? 24 : this.normalize(20), color: darkFont}]}>{title}</Text>
                {!(currentTotal == 0) && //fontSize: screenWidth > 350 ? 20 : 16
                    <View>
                        <Text allowFontScaling={false} allowFontScaling={false} style={[{padding: 5, marginBottom: 0, paddingBottom: 0, textAlign: 'center', fontWeight: 'bold'}, {color: parseFloat(this.state.amount).toFixed(2) === parseFloat(currentTotal).toFixed(2) ? darkFont : red, fontSize: global.isATablet ? 24 : this.normalize(15) }]}>{text5} : {formatDollars(currentTotal)}</Text>
                        <Text allowFontScaling={false} allowFontScaling={false} style={[{padding: 5, paddingBottom: 0, paddingTop: 0, textAlign: 'center'}, {color: parseFloat(this.state.amount).toFixed(2) === parseFloat(currentTotal).toFixed(2) ? darkFont : red, fontSize: global.isATablet ? 24 : this.normalize(15) }]}>{text6} : {formatDollars(expectedAmount)}</Text>
                    </View>}
                {!!LimitText && <Text allowFontScaling={false} allowFontScaling={false} style={{textAlign: 'center', fontSize: global.isATablet ? 20 : this.normalize(12), fontStyle: 'italic', margin: 20, marginTop: 5, marginBottom: 0, color: greyFont}}>({LimitText})</Text>}
                <Text allowFontScaling={false} style={{color: darkFont, fontSize: global.isATablet ? this.state.display === '' ? 60 : 70 : this.state.display === '' ? this.normalize(30) : ( this.state.amount.toString().length < 8 ? this.normalize(60) : this.normalize(40) ), margin: (this.state.display === '') || (!this.state.valid) ? 10 : 30, textAlign: 'center', alignSelf: 'center', flex: 1}}>$ {this.state.amount}</Text>
                
                {//Paragraph that only appears when no entry to inform user of calculator usage. Color was #474D65
                this.state.display === '' &&
                <Text allowFontScaling={false} style={{backgroundColor: greyblue, color: txtwhite, padding: 14.5, fontSize: global.isATablet ? 22 : this.normalize(14), textAlign: 'center'}}>
                    {usage}
                </Text>}


                {//Error that appears if you go past your amount limit.
                !this.state.valid &&
                <View style={{backgroundColor: lightgrey}}>
                    {this.refs.calculationDisplay.scrollToEnd({animated: false})}
                    <Text allowFontScaling={false} style={{backgroundColor: red, color: txtwhite, padding: 14.5, fontSize: global.isATablet ? 24 : this.normalize(15), textAlign: 'center'}}>
                        {error}
                    </Text>
                </View>}

                <ScrollView style={{width: screenWidth, backgroundColor: lightgrey}} ref='calculationDisplay'>
                    <Text allowFontScaling={false} style={{textAlign: 'right', margin: screenHeight * .025, color: darkFont, fontSize: global.isATablet ? 26 : this.normalize(15)}}>{this.state.display}</Text>
                </ScrollView>

                {/* This is the calculator input. The number buttons as well the submit. */}
                <View style={{backgroundColor: '#DDDDDD', width: screenWidth, height: screenHeight * .31, alignSelf: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 3}}>
                    {keyValues.map((value) =>
                        <TouchableOpacity key={value.icon} disabled={!value.enabled} style={{width: (screenWidth/4) * .98, height: screenHeight * .07, backgroundColor: value.enabled ? value.color : '#CCCCCC', marginTop: 2.5, }} onPress={this.onBtnPressed.bind(this, value.icon)}>
                            <View>
                                {
                                  (value.icon.toString().length > 4)
                                  ? //this is an icon key
                                  <View style={{alignSelf: 'center', marginTop: screenHeight * .015}}>
                                      <Icon
                                        color='black'
                                        name={value.icon}
                                        size={global.isATablet ?  this.normalize(40) : this.normalize(35)}
                                        style={[value.style, {}]}
                                      />
                                  </View>
                                  : //this is a number key
                                  <View style={{alignSelf: 'center', paddingTop: (value.icon == ' + ' || value.icon == '.') ? 0 : screenHeight * .01}}>
                                      <Text allowFontScaling={false} style={[value.style]}>
                                        {value.icon}
                                      </Text>
                                  </View>
                                }
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}
