/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  colors: {
    bg: '#1a9fad',
    // bg:'#ffcf26',
    sky: '#00caf2',
    main: '#1a9fad',
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

};
