// this component adds the font to every text within the app, as opposed to adding it via styles in every compoment piecemeal.  This is one of two solutions.  The other solution is to create a new font file in the constants folder.

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FontTitleText = props => {
  return <Text style={styles.bodyText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans-bold',
    fontSize: 22
  }
});

export default FontTitleText;
