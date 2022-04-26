import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  PRIMARY_COLOR: '#065f63',
  SECONDARY_COLOR: '#8ebcbe',
  BACKGROUND_COLOR: '#fefefe',
  BLACK_COLOR: '#333333',
  WHITE_COLOR: '#fefffe',
  GRAY_COLOR: '#9c9c9c',
  BORDER_GRAY: '#dddddd',
  FIXED_MARGIN: 15,

  title: {
    color: '#333333',
    fontWeight: '900',
    letterSpacing: 0.9,
    fontSize: 30,
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#065f63',
    width: 'auto',
    alignSelf: 'center',
    padding: 7,
  },
  textInput: {
    color: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
});
