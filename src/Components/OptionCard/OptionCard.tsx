import React from 'react';
import {View, Text} from 'react-native';
import makeStyle from './styles';
import {NativeBaseProvider, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeOption from '../../Models/HomeOption.model';

export default function OptionCard(props: {item: HomeOption}) {
  const styles = makeStyle();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.item.bgColor,
        },
      ]}>
      <Text style={styles.smallText}>{props.item.smallText}</Text>
      <Text style={styles.bigText}>{props.item.bigText}</Text>
      <NativeBaseProvider>
        <Icon
          style={styles.icon}
          name="arrowright"
          as={AntDesign}
          color={props.item.bgColor}
        />
      </NativeBaseProvider>
    </View>
  );
}
