import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {width, height, fonts} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    formCont: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      backgroundColor: '#fff',
      elevation: 5,
      width: 0.85 * width,
      minHeight: 400,
      alignSelf: 'center',
      borderRadius: 20,
      // position: 'absolute',
      top: -0.25 * height,
      paddingHorizontal: 0.05 * width,
      zIndex: 20,
      flex: 1,
    },
    title: {
      color: themeColors.text,
      fontFamily: fonts.med,
      textAlign: 'center',
      fontSize: 20,
      marginVertical: 5,
    },
    line: {
      width: '80%',
      height: 1,
      backgroundColor: themeColors.text,
      alignSelf: 'center',
      opacity: 0.2,
    },
    input: {
      marginVertical: 0.03 * height,
    },
    dropDown: {
      marginBottom: 0.02 * height,
    },
  });

export default makeStyle;
