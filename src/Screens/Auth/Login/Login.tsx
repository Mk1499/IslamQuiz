import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import styles from './styles';

export default class Login extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text> textInComponent </Text>
      </ScrollView>
    );
  }
}
