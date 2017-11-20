//The main menu, just says "Hello World".

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class Home extends Component {
	constructor(props) {
		super(props);
		//this.state = {};
	}

	render() {
		const { navigation } = this.props;

		return (
		  <View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Changes you make will automatically reload.</Text>
				<Text>Shake your phone to open the developer menu.</Text>
				<Button
					onPress={() => navigation.navigate('Login')}
					title="Back"
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