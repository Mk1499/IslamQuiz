import {StyleSheet} from 'react-native';
import {height, width} from '../../../../Config/global';

export default StyleSheet.create({
  container: {
    // paddingHorizontal: 0.02 * width,
  },
  headerCont: {},
  topCont: {
    paddingHorizontal: 0.02 * width,
    paddingBottom: 0.1 * height,
    paddingTop: 0.02 * height,
  },
  listCont: {
    backgroundColor: '#fff',
    width: 0.9 * width,
    alignSelf: 'center',
    paddingTop:0.025 * height,
    minHeight: 0.9 * height,
    marginTop: -0.07 * height,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list: {
    paddingTop: 0.02 * height,
    alignItems: 'center',
  },
});
