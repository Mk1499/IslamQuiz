import React from 'react';
import {View, FlatList, ImageBackground} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ChallengeLanding.screen.styles';
import {MyText, MyButton} from '../../../Components/Native';
import I18n from '../../../translate';
import tips from './tips';
import Header from '../../../Components/Header/Header';

export default function ChallengeLanding() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function start() {}

  function renderTip({item}) {
    return (
      <View style={styles.tipItemCont}>
        <MyText style={styles.tipItem}>- {item.value}</MyText>
      </View>
    );
  }

  return (
    <View>
      <Header label={I18n.Screens.enterChallenge} />
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <View style={styles.tipsCont}>
          <MyText style={styles.title}>{I18n.ChallengeLanding.welcome}</MyText>
          <MyText style={styles.note}>{I18n.ChallengeLanding.note}</MyText>
          <FlatList data={tips} renderItem={renderTip} />
        </View>
        <MyButton
          style={styles.startBtn}
          label={I18n.ChallengeLanding.start}
          action={start}
        />
      </ImageBackground>
    </View>
  );
}
