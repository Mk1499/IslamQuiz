import {StyleSheet} from 'react-native';
import Constants from '../../Config/Constants';

const {fonts} = Constants;
const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      // backgroundColor: 'rgba(0,0,0,0.7)',
      backgroundColor: themeColors.bg,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    appName: {
      fontFamily: fonts.med,
      fontSize: 30,
      //   marginTop: 10,
    },
    img: {
      //   width: '50%',
      height: '20%',
      resizeMode: 'contain',
    },
  });

export default makeStyle;
