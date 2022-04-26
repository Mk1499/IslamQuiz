import React, {Component} from 'react';
import {Text, View} from 'react-native';
import BackIcon from '../Icon/BackIcon';
import styles from './style';

type MyProps = {
  screenName: String;
  goBack: Function;
};

export default class ScreenHeader extends Component<MyProps, {}> {
  render() {
    const {screenName, goBack} = this.props;
    return (
      <View style={styles.container}>
        <BackIcon action={() => goBack()} />
        <Text style={styles.screenName}>{screenName}</Text>
      </View>
    );
  }
}
