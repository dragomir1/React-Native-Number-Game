import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FontBodyText from '../FontBodyText/FontBodyText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <FontBodyText>Game is over!</FontBodyText>
      <FontBodyText>
        Number was:
        {props.userChoiceNum}
      </FontBodyText>
      <FontBodyText>
        The computer guessed the number in {props.numOfRounds} rounds.
      </FontBodyText>
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
