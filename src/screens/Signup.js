import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	username: 'Username',
    	password: 'Password',
    	email: 'Email',
    }
  }

  render() {
  	return (
  	  <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
  	    <TextInput value={this.state.username}/>
  	    <TextInput value={this.state.email}/>
  	    <TextInput value={this.state.password}/>
  	    <TextInput value={this.state.password}/>
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  
})