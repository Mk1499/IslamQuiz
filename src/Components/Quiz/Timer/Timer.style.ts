import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {fonts} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 2,
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 5,
    },
    icon: {
      marginEnd: 4,
    },
    text: {
      color: '#fff',
      fontFamily: fonts.bold,
    },
  });

export default makeStyle;
