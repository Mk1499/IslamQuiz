import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import makeStyle from './styles';

type MyItem = {
  id: Number;
  title: String;
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
  const styles = makeStyle();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => action()}>
      <Image source={{uri: item.cover}} style={styles.cover} />
      <Text style={styles.name}>{item.title}</Text>
    </TouchableOpacity>
  );
}
