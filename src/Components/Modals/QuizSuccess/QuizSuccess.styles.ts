import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {fonts, width, height} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {},
    content: {
      backgroundColor: themeColors.bg,
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.01 * height,
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: 0.03 * height,
    },
    title: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      textAlign: 'center',
      fontSize: 20,
    },
    msg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      textAlign: 'center',
      fontSize: 17,
    },
    image: {
      alignSelf: 'center',
      height: 0.1 * height,
      resizeMode: 'contain',
      marginTop: moderateScale(10),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnCont: {
      width: moderateScale(300),
      alignSelf: 'center',
    },
    codeCont: {
      marginHorizontal: 0.02 * width,
      paddingHorizontal: 0.02 * width,
      marginVertical: 0.02 * width,
      borderWidth: 1,
      borderRadius: 5,
      borderBottomColor: themeColors.primary,
      borderEndColor: themeColors.primary,
    },
    code: {
      fontFamily: fonts.med,
      fontSize: 18,
      color: themeColors.text,
    },
    icon: {
      marginHorizontal: 5,
    },
    input: {
      borderBottomColor: themeColors.primary,
      borderColor: themeColors.primary,
      borderWidth: 1,
      borderRadius: 5,
      color: themeColors.primary,
      paddingHorizontal: 0.05 * width,
    },
    rowCont: {
      marginTop: 0.03 * height,
    },
  });

export default makeStyle;
