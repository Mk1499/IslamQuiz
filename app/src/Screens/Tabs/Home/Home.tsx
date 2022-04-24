import React, {Component} from 'react';
import {View, Text, ScrollView, I18nManager} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../../Components/Header/Main/MainHeader';
import styles from './style';
import I18n from '../../../../Services/Translate/index';
// import I18n from 'i18n-js';

export class Home extends Component {
  componentDidMount() {
    I18nManager.forceRTL(true);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.topCont}>
          <MainHeader />
          <View style={styles.welCont}>
            <Text style={styles.welText}>{I18n.t('Home.welcomeBack')}</Text>
            <Text style={styles.name}>محمد خالد</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text> Home Screen </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
