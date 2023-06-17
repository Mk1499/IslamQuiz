/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../../Models/ThemeColors.model';
import Constants from '../../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {height, width} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.bg,
    },
    content: {},
    upperCont: {
      backgroundColor: themeColors.primary,
      paddingTop: 0.05 * height,
      paddingBottom: 0.1 * height,
      paddingHorizontal: 0.05 * width,
      // borderBottomRightRadius: moderateScale(70),
      borderBottomLeftRadius: moderateScale(80),
    },
    resultCont: {},
    searchCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.bg,
      paddingHorizontal: 0.02 * width,
      borderRadius: moderateScale(10),
    },
    searchInput: {
      fontSize: 0.025 * height,
      height: 'auto',
      color: themeColors.primary,
      flex: 1,
      borderWidth: 0,
      // width: '100%',
    },
    icon: {
      color: themeColors.primary,
    },
    section: {},
    sectionTitle: {},
  });
export default makeStyle;
