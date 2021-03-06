import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Importing the colors object.
import Colors from '../../constants/colors';

const Header = props => {
  return (
    /* <View> wil be used for positioning the text and giving it some styling. */
    <View style={styles.header}>
      {/* this will receive a title prop and this is where we're outputting it on to the screen */}
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // this takes full width if the parent component, in which the parent take full width of device.
    width: '100%',
    height: 90,
    paddingTop: 40,
    // replacing hex value for imported color object
    backgroundColor: Colors.primary,
    // every view by defualt uses flexbox. this controls how the child elements of the view are positioned inside of view.
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
});

export default Header;
