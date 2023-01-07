import {StyleSheet} from 'react-native';
import Constants from '../../Config/Constants';

const {colors} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 15,
    },
    text: {
      // fontFamily: fonts.reg,
      color: colors.darkText,
    },
    normalCont: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 2,
    },
    activeCont: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeText: {
      // fontFamily: fonts.reg,
      color: colors.white,
      textAlign: 'center',
    },
  });

export default makeStyle;
