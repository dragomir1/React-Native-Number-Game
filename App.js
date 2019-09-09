import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header';
import StartGameScreen from './components/Screens/StartGameScreen';
import GameScreen from './components/Screens/GameScreen';
import GameOverScreen from './components/Screens/GameOverScreen';

// we want to load fonts when the app starts.
import * as Font from 'expo-font';

// this component prolongs the default loading screen...the splash screen, to stay active until a certain of your choice is done.  we can use state to managage the data loading.
import { AppLoading } from 'expo';

// creating font funciton outside of the functional component beucase it doens't need to be recreated for every component re-render cycle.

// method on the Font package allows you to load fonts, you pass an object.  loadAsync returns a promise. perform async fiunction call.

async function fetchFonts() {
  await Promise.all([
    Font.loadAsync({
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  ]);
}

export default function App() {
  const [userNumber, setUserNumberState] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoadedState] = useState(false);

  // if data isn't loaded, we return this component.
  if (!dataLoaded) {
    // this takes a starAsync prop that points to an operation to start when this comp is first rendered. THIS HAS to be a function that returns a promise becuase expo will listen to promise and when it's resolved, it will know that loading is done and will call what ever is passed to the 'onFinish' prop.  it takes a function that will be executed when startAsyn operation is done and for expo to find out when it's done, it should return a promise.
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoadedState(true)}
        onError={error => console.log(error)}
      />
    );
  }

  // stores the number of rounds it took computer to finish. initilize to zero.  this is set when game is over.
  // IF GUESS ROUNDS IS 0 => GAME HASNT STARTED.  IF GUESS ROUNDS IS > 0 => GAMEOVERHANDLER EXECTUED AND GAME IS OVER.

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
      <Header title='Guess a number game!' />
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
