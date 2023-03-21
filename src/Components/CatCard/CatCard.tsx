import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import makeStyle from './styles';
import {getActiveLang} from '../../translate';
import MyImage from '../Native/MyImage/MyImage';
import {useTheme} from '../../Theme/ThemeProvider';

type MyItem = {
  id: Number;
  arName: String;
  enName: String;
  desc: String;
  cover: String;
  time: Number;
  date: Date;
};

type MyProps = {
  item: MyItem;
  action: Function;
};

export default function CatCard({item, action}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const title = getActiveLang() === 'en' ? item.enName : item.arName;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => action()}>
      <MyImage uri={item.cover} style={styles.cover} />
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
  );
}
