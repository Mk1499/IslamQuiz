import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {NativeBaseProvider} from 'native-base';
import HeadIcon from '../Icon/HeadIcon';

export default class MainHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeadIcon />
      </View>
    );
  }
}
