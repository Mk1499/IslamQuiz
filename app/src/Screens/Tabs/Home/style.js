import {Platform, StyleSheet} from 'react-native';
import {
  fontBold,
  fontMed,
  fontReg,
  height,
  mainColor,
  width,
} from '../../../Config/global';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 0.05 * width,
    paddingVertical: 0.02 * height,
  },
  topCont: {
    backgroundColor: '#fff',
    paddingBottom: 0.1 * height,
    paddingHorizontal: 0.05 * width,
    borderBottomRightRadius: 0.2 * width,
  },
  welText: {
    fontFamily: fontMed,
    color: '#fff',
    fontSize: 20,
  },
  name: {
    fontFamily: fontBold,
    color: '#fff',
    fontSize: 20,
  },

  optionsList: {
    alignItems: 'flex-start',
    marginTop: -0.07 * height,
  },
  section: {
    marginVertical: 0.02 * height,
  },
  secHeadCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secTitle: {
    fontFamily:fontBold,
    fontSize:18
  },
  viewAll: {
    fontFamily:fontReg,
    fontSize:12, 
    color:'#ff8d71'
  },
  categriesList:{
    // marginTop:0.01 * height,
    paddingTop:0.02 * height,
    alignItems:'center'
  }
});
