/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Constants from '../../../Config/Constants';

const {colors,fonts} = Constants;
const makeStyle = () => StyleSheet.create({
  container: {
    // backgroundColor:colors.bg,
    minHeight:'100%'
  },
  formCont: {
    paddingVertical: 0.03 * Constants.height,
    paddingHorizontal: 0.05 * Constants.width,
  },
  text: {
    color:colors.main,
    fontFamily:fonts.bold,
    fontSize:15,
    marginTop:8,
  }
});

export default makeStyle;