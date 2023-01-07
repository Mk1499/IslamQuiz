import {StyleSheet} from 'react-native';
import Constants from '../../Config/Constants';
import {getActiveLang} from '../../translate';

const {width, height, fonts} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    coverBGImg: {
      width,
      height: 0.35 * height,
    },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    icon: {
      fontSize: 30,
      textAlign: 'center',
      alignSelf: getActiveLang() === 'ar' ? 'flex-start' : 'flex-end',
      marginVertical: 0.02 * height,
    },
    detailsCont: {
      paddingBottom: 0.02 * height,
    },
    description: {
      fontFamily: fonts.med,
      color: '#fff',
      fontSize: 14,
    },
    title: {
      fontFamily: fonts.bold,
      color: '#fff',
      fontSize: 20,
    },
  });

export default makeStyle;
