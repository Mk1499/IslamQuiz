import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import makeStyle from './styles';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeOption from '../../Models/HomeOption.model';
import {getActiveLang} from '../../translate';

export default function OptionCard(props: {item: HomeOption}) {
  const styles = makeStyle();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: props.item.bgColor,
        },
      ]}
      onPress={props.item.action}>
      <Text style={styles.smallText}>{props.item.smallText}</Text>
      <Text style={styles.bigText}>{props.item.bigText}</Text>
      <Icon
        style={styles.icon}
        name={getActiveLang() === 'ar' ? 'arrowleft' : 'arrowright'}
        as={AntDesign}
        color={props.item.bgColor}
      />
    </TouchableOpacity>
  );
}
