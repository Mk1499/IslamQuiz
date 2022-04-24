import {Platform, StyleSheet} from 'react-native';
import {fontMed, height, mainColor, width} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // height
  },
  topCont: {
    backgroundColor: mainColor,
    paddingBottom: 0.25 * height,
    paddingHorizontal: 0.05 * width,
    borderBottomLeftRadius: 0.1 * width,
  },
  welCont: {},
  welText: {
    // textAlign: 'right',
    fontFamily: fontMed,
    color: '#fff',
  },
  name: {
    // textAlign: 'right',
    fontFamily: fontMed,
    color: '#fff',
  },
  quizList: {},
});
