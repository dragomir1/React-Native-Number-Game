import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Game is over!</Text>
      <Text>
        Number was:
        {props.userChoiceNum}
      </Text>
      <Text>
        Number of rounds it took conputer to guess the number:
        {props.numOfRounds}
      </Text>
      <Button title='NEW GAME' onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GameOverScreen;
