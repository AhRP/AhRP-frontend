//Will just have username and password text field that does no checks, on submit will take to home screen.

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Username',
      password: '',
    };
  }

  render() {
    const { navigation } = this.props;
        
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image resizeMode='contain' style={{height: 100, width: 100}} source={require('src/config/logo.png')} />
          <TextInput style={styles.input} value={this.state.username}/>
          <TextInput style={styles.input} value={this.state.password}/>
          <TouchableOpacity
            style={{height: global.height * .08, width: global.width * .8, backgroundColor: 'pink'}}
            onPress={() => navigation.navigate('Home')}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{height: global.height * .08, width: global.width * .8, backgroundColor: 'pink'}}
            onPress={() => navigation.navigate('Signup')}>
            <Text>Create a New Account</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: global.width * .8,
  },
  page: {
    backgroundColor: '#fff',
    width: global.width,
    height: global.height,
  },
  logo: {
    height: global.height * .07,
    width: global.height * .07,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: global.height * .15,
    marginBottom: global.height * .15,
  },
});
