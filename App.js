import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header';
import StartGameScreen from './components/Screens/StartGameScreen';
import GameScreen from './components/Screens/GameScreen';
import GameOverScreen from './components/Screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumberState] = useState(null);

  // stores the number of rounds it took computer to finish. initilize to zero.  this is set when game is over.
  // IF GUESS ROUNDS IS 0 => GAME HASNT STARTED.  IF GUESS ROUNDS IS > 0 => GAMEOVERHANDLER EXECTUED AND GAME IS OVER.
  const [guessRounds, setGuessRounds] = useState(0);

  // WE RESET THE ENTIRE GAME ONCE THE COMPUTER GUESSES NUM.
  const newGameConfig = () => {
    // reset to zero when new game starts.
    setGuessRounds(0);
    // resetting this to null..this will take us back to StartGameScreen becuase the if statment switching screens will all be false.
    setUserNumberState(null);
  };

  // this is triggered in GameScreen. we show GameOverSCreen when guessRounds > 0.
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

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

  // The new Game config has reset the guessRounds and userNumber. this if statement is false and will go back to StartGameScreen. initial value of content.
  if (userNumber && guessRounds === 0) {
    // we take the stored userNumber and we pass it down to the game screen which is only rendered if we have a user number.
    content = (
      <GameScreen userChoiceNum={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numOfRounds={guessRounds}
        userChoiceNum={userNumber}
        onRestart={newGameConfig}
      />
    );
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
