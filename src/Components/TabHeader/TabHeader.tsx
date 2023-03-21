import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './tabHeader.styles';

type MyProps = {
  label: String;
  iconName: String;
  iconAction: Function;
};

export default function TabHeader(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function defineImg() {
    let img;
    switch (props.iconName) {
      case 'logout':
        img = require('../../../assets/images/icons/logout.png');
    }

    return img;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imgCont} onPress={props.iconAction}>
        <Image source={defineImg()} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.text}>{props.label}</Text>
    </View>
  );
}
