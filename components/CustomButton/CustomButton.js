import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

const CustomButton = props => {
  return (
    /* Since this is a reusable compoment, we handle press events not in here but in the place where we use the button. so we forward the action */
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans-regular',
    fontSize: 18
  }
});

export default CustomButton;
