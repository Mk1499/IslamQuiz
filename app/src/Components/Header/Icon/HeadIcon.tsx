import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NativeBaseProvider, Icon} from 'native-base';
import styles from './styles';
import IconFonts from '../../../Config/IconFonts';

export default class HeadIcon extends Component {
  render() {
    return (
      <View>
        <NativeBaseProvider>
          <View style={styles.container}>
            <Icon
              style={styles.icon}
              name="notifications"
              as={IconFonts.Ionicons}
              size="md"
            />
          </View>
        </NativeBaseProvider>
      </View>
    );
  }
}
