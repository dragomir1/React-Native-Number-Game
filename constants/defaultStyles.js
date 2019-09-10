// this file is the default styles for the entire app. these are globally managed styles you share across components. general layout, colors..this is one of two options. the other is a wrapper component. this is a global style set up.

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans-regular'
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  }
});
