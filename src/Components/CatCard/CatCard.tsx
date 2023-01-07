import React from 'react';
import {View, Text, Image} from 'react-native';
import makeStyle from './styles';

type MyProps = {
  id: Number;
  title: String;
  desc: String;
  cover: String;
  time: Number;
  date: Date;
};

export default function CatCard({item}: MyProps) {
  const styles = makeStyle();
  return (
    <View style={styles.container}>
      <Image source={{uri: item.cover}} style={styles.cover} />
      <Text style={styles.name}>{item.title}</Text>
    </View>
  );
}
