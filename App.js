import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header';
import StartGameScreen from './components/Screens/StartGameScreen';
import GameScreen from './components/Screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumberState] = useState();

  // [we get selected num from startgame screen when user clicks "start game" button.  We then store that number in state as the usernumber...]
  const startGameHandler = selectedNumber => {
    setUserNumberState(selectedNumber);
  };

  let content = (
    <StartGameScreen
      // startGameHandler is bound to the startGameHandler function which expects to receive that selectedNumber argument.
      startGameHandler={startGameHandler}
    />
  );

  if (userNumber) {
    // we take the stored userNumber and we pass it down to the game screen which is only rendered if we have a user number.
    content = <GameScreen userChoiceNum={userNumber} />;
  }

  return (
    <View style={styles.container}>
      <Header title='Guess a number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // setting to flex one isures that the view will take all the space it can get.  this is the ROOT view of app it will take all the width and hieght and occupy the full screen
    flex: 1
  }
});
