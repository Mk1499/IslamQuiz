import React, {Component} from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeOption from '../../../Models/HomeOption';
import styles from './style';
import {NativeBaseProvider, Icon} from 'native-base';
import IconFonts from '../../../Config/IconFonts';

type MyProps = {
  item: HomeOption;
};

export default class OptionCard extends Component {
  render() {
    const {item} = this.props;
    return (
      <LinearGradient
        colors={[item.color1, item.color2]}
        style={styles.container}>
        <View style={styles.textCont}>
          <Text style={styles.name}> {item.name} </Text>
        </View>
        <View style={styles.iconCont}>
          <NativeBaseProvider>
            <Icon
              name="arrowleft"
              style={[styles.icon,{color:item.color2}]}
              as={IconFonts.AntDesign}
              size="lg"
            />
          </NativeBaseProvider>
        </View>
      </LinearGradient>
    );
  }
}
