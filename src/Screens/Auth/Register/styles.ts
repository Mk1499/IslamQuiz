/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Constants from '../../../Config/Constants';

const makeStyle = () => StyleSheet.create({
  container: {
    // backgroundColor:colors.primary,
  },
  formCont:{
    paddingVertical: 0.03 * Constants.height,
    paddingHorizontal : 0.05 * Constants.width,
  }
});

export default makeStyle;
