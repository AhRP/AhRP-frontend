import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from 'src/config/navigators';

export default class App extends React.Component {
  render() {
    console.log("Rendering the App.js...")
    return (
      <RootNavigator/>
    );
  }
}
