/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  colors: {
    bg: '#00C4BC',
    // bg:'#ffcf26',
    sky: '#00caf2',
    main: '#149fac',
    subText: '#fff',
    darkText: '#1c1d1c',
    white: '#fff',
    orange: '#ff7040',
    green: '#47cc49',
  },
  fonts: {
    reg: 'Cairo',
    bold: 'Cairo-Bold',
    med: 'Cairo-SemiBold',
  },
  styles: {
    paddingH: 0.05 * Dimensions.get('window').width,
  },
};
