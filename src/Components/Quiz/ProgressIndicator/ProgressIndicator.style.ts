import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import {getActiveLang} from '../../../translate';

const {height} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginVertical: 0.02 * height,
    },
    item: {
      height: 4,
      backgroundColor: '#fff',
      marginHorizontal: 2,
      flex: 1,
      opacity: 0.5,
    },
    activeItem: {
      height: 4,
      backgroundColor: '#fff',
      marginHorizontal: 2,
      flex: 1,
      opacity: 1,
    },
  });

export default makeStyle;
