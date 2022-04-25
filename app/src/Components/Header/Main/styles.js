import {Platform, StyleSheet} from 'react-native';
import {height} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0.04 * height : 0,
    marginVertical: 0.02 * height,
    // flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  iconCont: {},
  icon: {},
});
