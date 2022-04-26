import {Platform, StyleSheet} from 'react-native';
import {fontBold, height, mainColor, width} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0.04 * height : 0,
    paddingVertical: 0.02 * height,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart:0.04 * width
  },
  screenName: {
    marginHorizontal: 0.04 * width,
    color: '#fff',
    fontFamily: fontBold,
    fontSize: 17,
  },
});
