import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header';
import StartGameScreen from './components/Screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title='Guess a number' />
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // setting to flex one isures that the view will take all the space it can get.  this is the ROOT view of app it will take all the width and hieght and occupy the full screen
    flex: 1
  }
});
