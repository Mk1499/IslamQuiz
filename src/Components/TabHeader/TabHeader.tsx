import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './tabHeader.styles';

type MyProps = {
  label: String;
  leftIcon: JSX;
  rightIcon: JSX;
};

function TabHeader(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  // function defineImg() {
  //   let img;
  //   switch (props.iconName) {
  //     case 'logout':
  //       img = require('../../../assets/images/icons/logout.png');
  //   }

  //   return img;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.iconCont}>{props.leftIcon && props.leftIcon}</View>
      <Text style={styles.text}>{props.label}</Text>
      {/* {props.iconName && (
        <TouchableOpacity style={styles.imgCont} onPress={props.iconAction}>
          <Image source={defineImg()} style={styles.img} resizeMode="contain" />
        </TouchableOpacity>
      )} */}
      <View style={styles.iconCont}>{props.rightIcon && props.rightIcon}</View>
    </View>
  );
}

export default memo(TabHeader);
