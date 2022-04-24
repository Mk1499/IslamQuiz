import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';

export class Home extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text> Home Screen </Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
