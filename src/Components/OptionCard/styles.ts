/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';
import {getActiveLang} from '../../translate';

const {width, height, fonts} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      width: 0.3 * width,
      marginHorizontal: 0.03 * width,
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.01 * height,
      borderRadius: 10,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      // height:0.3 * height
    },
    smallText: {
      fontFamily: fonts.med,
      color: '#fff',
    },
    bigText: {
      fontFamily: fonts.bold,
      color: '#fff',
      fontSize: moderateScale(16),
      marginBottom: moderateScale(5),
    },
    icon: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      fontSize: 20,
      width: '40%',
      textAlign: 'center',
      height: 22,
      paddingTop: 5,
      borderRadius: 5,
      alignSelf: getActiveLang() === 'ar' ? 'flex-start' : 'flex-end',
    },
  });

export default makeStyle;
