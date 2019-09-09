// This screen will switch to Game Screen from Start Game Screen when the game is running.  this will have the random num generator logic.

// things that need to happen here..the computer needs to make a guess when the screen loads. and it also needs to make a new guess everytime the user presses 'too high' or 'too low' button.

// USEREF hook allows to you define and hold to a value that survives component re-renders. in this case when the component rerenders and we get a new num, the previous num is held wih useRef().  It's a “box” that can hold a mutable value in its .current property.

// USEEFFECT  allows you to run side effects(timers, subscriptons, mutations, api calls) after the component renders.  By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.ALLOWS YOU TO RUN LOGIC AFTER EERY RENDER CYCLE.

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumContainer from '../NumberContainer/NumberContainer';
import FontBodyText from '../FontBodyText/FontBodyText';
import Card from '../Card/Card';
import Colors from '../../constants/colors';
// import the stylesheet object containing the default styles for entire app.
import DefaultStyles from '../../constants/defaultStyles';

// creating a new funciton ouside of the GameScreen component. this function shouldn't be recreated every time GameScreen re-renders to save performance.
// if you don't rely on props or state, you can have a function that resides outside of your component.

// excludedNumber is the edge case where it excludes the solution on the first try.  The computer will never guess the number on the first try. if it hits that number it will do a recurcise call to generate a new num.
const generateRandomNum = (min, max, excludeNumber) => {
  min = Math.floor(min);
  max = Math.ceil(max);
  const RandomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (RandomNumber === excludeNumber) {
    return generateRandomNum(min, max, excludeNumber);
  } else {
    return RandomNumber;
  }
};

const GameScreen = props => {
  // we need to manage the state of the random number generated by the computer.  we call the randomNum function and save the resulting value in the currentGuess state.
  // SIDE NOTE: FIRST TIME THIS COMP RENDERS, THE RANDOM NUM WILL BE SAVED AS THE INITIAL STATE.  WHEN COMPONENT RERENDERS AND USESTATE IS CALLED AGAIN, WE GENERATED ANOTHER RANDOM NUMBER, THE NEW STATE WILL NOT OVERRIDE THE INITAL STATE, IT WILL BE MANAGED INDEPENDENTLY BY STATE, DETACHED FROM THE COMPONENT.
  // props.userChoiceNum(excludedNumber) is coming from the StartGameSceen Comp.
  const [currentGuess, setCurrentGuessState] = useState(
    generateRandomNum(1, 100, props.userChoiceNum)
  );

  //this state manages the round it took to guess the number
  const [rounds, setRounds] = useState(0);

  // these are the initaly values for our randomgen funciton.  we're able to update these references in the nextguesshandler funcion.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // we do this function here because we need access to the sourounding statecomp.
  // we are passing 'direction' as an argument. this denotes which direction the next guess should be..lower or greater.

  // this hook takes a funciton that runs by default after every rendered cycle for this component.

  // THIS CHECKS IF THE GAME IS OVER AFTER EVERY RENDER.  WE ADD A SECOND ARGUMENT TO THIS EFFECT TO BE MORE DIRECT REGARDING THE DEPENDENCIES OF THIS EFFECT.
  // THE FIRST ARGUMENT TAKES A FUNCTION THAT EXECUTES AFTER COMP RENDER.
  // SECOND ARGUMENT YOU PASS TO THIS EFECT IS AN ARRAY OF DEPENDENCIES OF THIS FUNCTION. - NEED TO SPECIFY ANY VALUE COMING FROM OUTSIDE OF THIS EFFECT FUNTION.

  // if this effect, when a value changes this effect will rerun after every renderCylcle.
  // if the value for the new render cycle is the same as the previous render cycle, then effect will not rerun.

  // ** object destructuring to destructure props object and pull these two property names (userChoiceNum, onGameOver) out of prop object and store the VALUES of those properties in constants with the same name.
  const { userChoiceNum, onGameOver } = props;

  // we use useEffect() becuase we need to check after every render if the resulting values match. use effect does actions after component renders.
  useEffect(() => {
    // once we destructed, and extracted the props. we don't need to use 'props.' use the name thats used as destructing name.
    if (currentGuess === userChoiceNum) {
      // we call this function and forward the amount of rounds it took computer to guess...needs a new state.
      onGameOver(rounds);
    }
    // this ARGUMENT YOU PASS TO THe EFECT IS AN ARRAY OF DEPENDENCIES (in this case args we're passing) OF THIS FUNCTION. - we NEED TO SPECIFY ANY VALUE COMING FROM OUTSIDE OF THIS EFFECT FUNTION. currentGuess is within this comp but outside this effect.  USERCHOICE AND ONGAME OVER ARE OUT OF THIS COMP.  SO WE NEED TO USE DESTRUCTURING TO PULL VAULES FROM THIS PROPS.
    // these are dependancies for this effect.
    // reason why we don't use 'props.userChoiceNum','props.onGameOver' is because 'props' always changes when the parent comp changes. here, only the changes in these props are stored.  This effect only re-run when only values on these dependances change.
  }, [currentGuess, userChoiceNum, onGameOver]);

  // THIS IS IF THE GUESS IS AN INCORRENT VALUE
  const nextGuessHandler = direction => {
    // we need to validate the direction button..if its' 'lower' or 'greater' than the number the compouter guessed.
    // this piece of logic just throw p an alert if it incorrent guess.
    if (
      (direction === 'lower' && currentGuess < props.userChoiceNum) ||
      (direction === 'higher' && currentGuess > props.userChoiceNum)
    ) {
      Alert.alert("Don't lie", "You can't trick the computer", [
        { text: 'OK', style: 'cancel' }
      ]);
      return;
    }
    // this logic checks hold the updated values as the current high & low. if computer guesses too high or too low. then useRef() holds that new number as the current reference value.
    if (direction === 'lower') {
      // here we the current mim and max should adjust over time as hints are given if the computer guess too small or too big.  for that we use a hook..the useRef() hook.

      // current is a property on the references generated by react are object with a current property where the value is stored in.
      // here we are setting the currentHigh and currentLow to the new current guess.
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    // here we generate a new random number with new high and low references and set that as the new currently guessed number.
    const nextNumber = generateRandomNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    // we are generating a new number
    setCurrentGuessState(nextNumber);
    // we need to set the rounds. set rounds takes in a funtion that does the action that updates the state.
    setRounds(currentRounds => currentRounds + 1);
  };

  return (
    <View style={styles.screen}>
      {/* we import and access bodyText object from Default styles.  this is another way to set globally accssable styles. */}
      <Text style={DefaultStyles.title}>The Computer's Guess:</Text>
      <NumContainer>{currentGuess}</NumContainer>
      <Card style={styles.buttonStyling}>
        <View>
          <Button
            title='LOWER'
            color={Colors.startGameColor}
            /* the value we have here passed as an argument should differ based on the button.  need to preconfigure the argument that's passed to the handler when it's executed.  we use the bind method for preconfiguration.*/
            // "this" is the first argument to bind. its what's should be referred to in the function thats getting called.
            // 'lower' is the first agrument recieved by the handler
            onPress={nextGuessHandler.bind(this, 'lower')}
          />
        </View>
        <View>
          <Button
            title='HIGHER'
            color={Colors.startGameColor}
            onPress={nextGuessHandler.bind(this, 'higher')}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // this will take all the avail screen below the header.  this is the child component of the App.
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    // this will not exceed the boundires of the parent view.
    maxWidth: '80%'
  },
  confirmOutPutStyle: {
    marginTop: 60,
    // the default is stretch..'ccenter' will only let the margin be as wide as number needs.
    alignItems: 'center'
  },
  confirmOutPutTextStyle: {
    fontSize: 20
  }
});

export default GameScreen;
