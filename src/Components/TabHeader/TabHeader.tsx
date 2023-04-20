import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './tabHeader.styles';

type MyProps = {
  label: String;
  iconName: String;
  iconAction: Function;
};

function TabHeader(props: MyProps) {
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
      <Text style={styles.text}>{props.label}</Text>
      {props.iconName && (
        <TouchableOpacity style={styles.imgCont} onPress={props.iconAction}>
          <Image source={defineImg()} style={styles.img} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default memo(TabHeader);
