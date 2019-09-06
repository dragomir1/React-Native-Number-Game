import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const SelectedNumber = props => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.numberStyle}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberStyle: {
    color: Colors.selectedNumColor,
    fontSize: 30
  }
});

export default SelectedNumber;
