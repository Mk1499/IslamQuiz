import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';

export class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> History Screen </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
