import {StyleSheet} from 'react-native';

import Constants from '../../../Config/Constants';
import {getActiveLang} from '../../../translate';

const {fonts, width, height} = Constants;
const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      minHeight: height,
    },
    content: {flex: 1},
    metaDateCont: {
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.03 * height,
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      paddingVertical: 0.02 * height,
    },
    label: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 15,
    },
    value: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: 15,
    },
  });

export default makeStyle;
