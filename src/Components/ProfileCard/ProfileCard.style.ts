/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';

const {fonts, colors} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
      top: -1 * moderateScale(50),
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingVertical: moderateScale(20),
    },
    img: {
      width: moderateScale(120),
      height: moderateScale(120),
      borderRadius: moderateScale(60),
      borderWidth: moderateScale(10),
      borderColor: themeColors.bg,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    name: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: 20,
    },
    dataCont: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      //   backgroundColor: 'red',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dataItem: {
      //   backgroundColor: colors.main,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),

      borderRadius: 10,
      borderColor: colors.main,
      borderWidth: 1,
    },
    dataItemText: {
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      color: themeColors.text,
      textAlign: 'center',
    },
  });
export default makeStyle;
