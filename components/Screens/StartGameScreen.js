// This component is responsible for everything you see on the screen besides the Header.
// we are import useState becuase we need to manage some state, handling and validating user input.
import React, { useState } from 'react';
//TouchableWithoutFeedback regisersed a touch listenter without visual feedback.
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  // this API controls keyboard events.
  Keyboard,
  // this API Launches an alert dialog with the specified title and message.
  Alert
} from 'react-native';
import Card from '../Card/Card';
// Importing the colors object.
import Colors from '../../constants/colors';
import Input from '../Input/TextInput';
const StartGameScreen = props => {
  // this hook will manaage our user input. useState is a string. all inputs are strings that need to be converted to numbers.
  const [enteredValue, setValueState] = useState('');

  // we are setting it up so that the user has a chance to confirm the value they enterted before palying the game.
  const [confirmed, setConfirmState] = useState(false);

  // this hooks handles the number that we use to start the game.  this is the number the user chooses to play with.
  const [selectedNumber, setSelectedNumerState] = useState();

  // this handles user input.  it also validates user input by using a regex and replaceing all non numberic values ^0-9 with an empty string.
  const numberInputHandler = enteredValue => {
    setValueState(enteredValue.replace(/[^0-9]/g, ''));
  };

  // side note: this is batched together for one render cycle.
  const resetValueHandler = () => {
    // resetting the confirmation back to false once they reset the value
    setValueState('');
    setConfirmState(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Not a number', 'Number has to be between 0-99', [
        { text: 'Try Again', style: 'cancel', onPress: resetValueHandler }
      ]);
      // return; //this exits the function completely. values are invalid
    } else {
      // we call SetConfirmState and sets it to true. when that happens the entire component function above rerenders and it sets it to true.
      //  these three setState call will be batched together when its re-rendered.  it will have the number as the number selected.
      // now the function is set to true => confirmed.
      setConfirmState(true);
      setSelectedNumerState(chosenNumber);
      setValueState('');
    }
  };
  // since we setConfirmState to true the bottom conditional will execute
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <View style={styles.confirmOutPutStyle}>
        <Text style={styles.confirmOutPutTextStyle}>
          Chosen Number: {selectedNumber}
        </Text>
        <Button
          title='Start game'
          color={Colors.startGameColor}
          onPress={() => {}}
        />
      </View>
    );
  }

  return (
    // this function closes out the keyboard when you touch anywhere else on the screen
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>Start a new Game!</Text>
        {/* here we're passing additional styling elements via prop to the card comp. */}
        <Card style={styles.inputContainer}>
          <Text style={styles.screenTextNum}>Select a number</Text>
          <Input
            style={styles.textInputStyle}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            // this points to the function that updates the state
            onChangeText={numberInputHandler}
            // this feeds the user input back as that enterted value.
            value={enteredValue}
          />
          <View style={styles.buttonStyling}>
            <View style={styles.buttonStyling1}>
              {/* there's a color prop on the button component.  Importing the colors object from colors file and adding them to the color prop*/}
              <Button
                title='Reset'
                color={Colors.secondary}
                onPress={resetValueHandler}
              />
            </View>
            <View style={styles.buttonStyling1}>
              <Button
                title='Confirm'
                color={Colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    // This takes all the space it can get from it's parent container. This means that when this compoonent is added below the header, it will take all the space below the header both vertical and horizontal.
    flex: 1,
    padding: 10,
    // this positions items along the cross-axis.  Every View by defualt uses flexbox and the flexdirection is 'column'.  alignItems aligns left to right - horizontally.
    alignItems: 'center'
  },
  buttonStyling1: {
    width: '40%'
  },
  confirmOutPutStyle: {
    marginVertical: 30
  },
  confirmOutPutTextStyle: {
    fontSize: 20
  },
  screenText: {
    fontSize: 20,
    marginVertical: 10
  },
  buttonStyling: {
    flexDirection: 'row',
    // positions along main axis.it's currently row..so left to right. this sits left and right edge of row and distribute all avail space between them.
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15
  },
  textInputStyle: {
    width: 50,
    textAlign: 'center'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
    // ALL THESE STYLING PROPERITES ARE IN THE CARD COMPONENT
    // these propeties only work on IOS
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // // above only works on ios
    // // below only works on andriod..this creates a shadow similar to ios
    // elevation: 10,
    // // default is transparent. set it to white so that if you can base color of screen. this would be white.
    // backgroundColor: 'white',
    // padding: 20,
    // borderRadius: 10
  },
  screenTextNum: {}
});
export default StartGameScreen;
