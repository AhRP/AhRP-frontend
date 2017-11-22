import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Dimensions from 'Dimensions';

//<Button color='blue' onPress={() => navigation.navigate('Home')} text='Login'/>

const Button = (onPress, text='text', color='pink') => {
  return (
    <TouchableOpacity style={{height: global.height * .08, width: global.width * .8, backgroundColor: color}} onPress={onPress} >
  	  <Text>{text}</Text>
  	</TouchableOpacity>
  )
}

export default Button;