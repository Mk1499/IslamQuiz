import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NativeBaseProvider, Icon} from 'native-base';
import styles from './styles';
import IconFonts from '../../../Config/IconFonts';

type MyProps = {
  action: Function;
};

export default class BackIcon extends Component<MyProps, {}> {
  render() {
    return (
      <View>
        <NativeBaseProvider>
          <View style={styles.container}>
            <Icon
              style={styles.icon}
              name="right"
              as={IconFonts.AntDesign}
              size="md"
              onPress={() => this.props.action()}
            />
          </View>
        </NativeBaseProvider>
      </View>
    );
  }
}
