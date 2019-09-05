// This component is responsible for everything you see on the screen besides the Header.
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Card from '../Card/Card';

const StartGameScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Start a new Game!</Text>
      {/* here we're passing additional styling elements via prop to the card comp. */}
      <Card style={styles.inputContainer}>
        <Text style={styles.screenTextNum}>Select a number</Text>
        <TextInput style={styles.textInputStyle} />
        <View style={styles.buttonStyling}>
          <Button title='Reset' onPress={() => {}} />
          <Button title='Confirm' onPress={() => {}} />
        </View>
      </Card>
    </View>
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
  textInputStyle: {},
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
