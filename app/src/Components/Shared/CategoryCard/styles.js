import {StyleSheet} from 'react-native';
import {fontBold, fontMed, height, width} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    minWidth: 0.3 * width,
    backgroundColor: '#fff',
    marginHorizontal: 0.07 * width,
    marginVertical: 0.03 * height,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0.03 * height,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: '70%',
    height: 0.1 * height,
    resizeMode: 'contain',
    marginTop: -0.07 * height,
  },
  name: {
    fontFamily: fontBold,
    textAlign: 'center',
    marginTop: 10,
  },
});
