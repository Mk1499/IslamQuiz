import {StyleSheet} from 'react-native';
import {height, mainColor, width} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    maxWidth: 0.1 * width,
    backgroundColor: mainColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
  },
});
