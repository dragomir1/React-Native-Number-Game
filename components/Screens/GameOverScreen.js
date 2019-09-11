import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import FontBodyText from '../FontBodyText/FontBodyText';
import FontTitleText from '../FontTitleText/FontTitleText';
import Colors from '../../constants/colors';
import CustomButton from '../CustomButton/CustomButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <FontTitleText>Game is over!</FontTitleText>
      <View style={styles.imageContainer}>
        {/* you need to pass width and height for network images. */}
        {/*       <Image
          style={styles.image}
          source={{uri:'../../assets/success.png'}}
        /> */}
        {/* you can add width and height to override the default check react native does on the image..that's what 'require' does.  it checks the width and height automatically */}
        <Image
          style={styles.image}
          source={require('../../assets/success.png')}
        />
      </View>
      <View style={styles.resultContainer}>
        {/* you're able to nest Text components.  you can style parts of the Text differently.  IMORTANT: TEXT WITHIN A TEXT COMPONENT RECIVES THE STYLING OF THE OUTER TEXT. STYLING IS RECIEVED BY THE NESTED TEXT COMPONENTS - ONLY ON TEXT WITHIN TEXT. */}
        <FontBodyText style={styles.resultText}>
          Your Chosen Number is{' '}
          <Text style={styles.highlight}>{props.userChoiceNum}.</Text> The
          computer guessed the number in{' '}
          <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds.
        </FontBodyText>
      </View>
      <CustomButton activeOpacity={0.6} onPress={props.onRestart}>
        NEW GAME
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText: {
    textAlign: 'center'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30
  },
  image: {
    // this width/height takes 100% of parent container which is current' set to 80%..so it's essentially take 80 of the view container.
    // FOR LOCAL IMAGES YOU DON'T NEED TO SET WIDTH AND HEIGHT.  FOR NETWORK IMAGES, YOU DO.
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    // width takes 80% of the parent container so 80% of the view.
    // on andriod it won't be a perfect circle..border radius needs to be half of width and height...so we need to the image a square then cut it in half.
    // width: 300,
    // height: 300,
    // borderRadius: 200,
    width: '80%',
    height: 300,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
    // any child inside of container that goes beyond the container is clipped.
    overflow: 'hidden',
    marginVertical: 20
  }
});

export default GameOverScreen;
