import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = props => {
  return (
    /* this again takes input style object as well as stylyng outside this component via props and combines them into one style for this this component. */
    /* {...props} Inherit any props passed to it and adds them to the component.  In this case we are props form the pace where we use this custom inpuT AND NOT FROM THIS COMPONENT. IN THIS CASE WE MAKE SURE WE HAVE THE SAME CONFIGURATION FOR ALL INPUTS WE USE IN OUR APP. SO WE SET NEW CONFIGURATIONS FROM THE PLACE WE ARE USING THIS COMPONENT INSTEAD.  */
    <TextInput {...props} style={{ ...styles.input, ...props.style }} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: 10
  }
});

export default Input;
