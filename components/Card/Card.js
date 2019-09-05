import React from 'react';
import { View, StyleSheet } from 'react-native';

/* the only goal of this comp is to apply style to the surrounding container.  props.children will take any value and pass it to this component. */
/* if we want to assign our own styles from outside and override some of the current styles, we pass a new object to style prop. this takes the current styling and distributes them in a new object to the style prop.   WE'RE TAKING ALL STYLES..ALL THE KEY/VALUE STYLING PROPERTIES DEFINED IN THE STYLE PROP FROM THE STARTGAMESCREEN COMPONENT AND MERGE THEM INTO THIS OBJECT. SINCE ITS ADDED AS A SECOND, IT WILL OVERRIDE ANY KEY/VALUE STYLING PAIRS FROM THE OUTSIDE WHEN WE USE OUR COMPONENT.  WHEN WE ADD ADDITIONAL STYLES OUTSIDE OF THE COMPONENT, IT WILL ALSO MERGE THEM IN THIS OBJECT.**WE CAN ASSIGN OUR OWN STYLES FROM OUTSIDE OF THE CARD COMPONENT WHEN WE USE THIS COMPONENT*/
const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    // these propeties only work on IOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // above only works on ios
    // below only works on andriod..this creates a shadow similar to above code
    elevation: 10,
    // default is transparent. set it to white so that if you can base color of screen. this would be white.
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});

export default Card;
