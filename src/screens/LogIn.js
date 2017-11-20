//Will just have username and password text field that does no checks, on submit will take to home screen.

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    //this.state = {};
  }

  render() {
    const { navigation } = this.props;
        
    return (
      <View style={styles.container}>
        <Text>LOGIN SCREEN</Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});