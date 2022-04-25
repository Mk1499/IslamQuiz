import {StyleSheet} from 'react-native';
import {fontMed, height, width} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    paddingVertical: 0.02 * height,
    marginHorizontal: 0.02 * width,
    borderRadius: 10,
    paddingHorizontal: 0.02 * width,
    // width:0.25 * width
  },
  textCont: {},
  name: {
    fontFamily: fontMed,
    color:'#fff', 
    marginBottom:17, 
    fontSize:16
  },
  iconCont: {},
  icon: {
      alignSelf:'flex-end', 
      color:'transparent',
      backgroundColor:'#fff',
      borderRadius:5
  },
});
