import React, {useEffect, useState} from 'react';
import {View, FlatList, ImageBackground, ActivityIndicator} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ChallengeLanding.screen.styles';
import {MyText, MyButton} from '../../../Components/Native';
import I18n from '../../../translate';
import tips from './tips';
import Header from '../../../Components/Header/Header';
import {socket} from '../../../Services/socket-service';
import socketEvents from '../../../utils/socketEvents';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';

type MyProps = {
  currentUser: User;
};

function ChallengeLanding({currentUser}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [searching, setSearching] = useState(false);
  const [challenge, setChallenge] = useState();

  useEffect(() => {
    console.log('ID : ', socket.id);
    challengeListener();
  }, []);

  function start() {
    socket.emit(socketEvents.startChallange, currentUser._id);
    setSearching(true);
  }

  function challengeListener() {
    socket.removeAllListeners();
    socket.on(socketEvents.challengeCreated, data => {
      console.log('Created Ch : ', data);
      setChallenge(data);
    });
    socket.on(socketEvents.compeleteChallenge, data => {
      console.log('joined Ch Data : ', data.questions[0]);
      const otherUser: User = data.participants?.find(
        p => p._id !== currentUser?._id,
      );
      setSearching(false);
      setChallenge(data);
    });
  }

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
          <FlatList data={tips()} renderItem={renderTip} />
        </View>
        <MyButton
          style={styles.startBtn}
          label={I18n.ChallengeLanding.start}
          action={start}
          disabled={searching}
        />
        {searching ? (
          <View style={styles.loadingCont}>
            <MyText>Looking for competitor</MyText>
            <ActivityIndicator />
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  currentUser: state.auth.userData,
});

export default connect(mapStateToProps, {})(ChallengeLanding);
