import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizRank.styles';
import I18n from '../../../translate';
import Loading from '../../Loading/Loading';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import User from '../../../Models/User.model';
import MyImage from '../../../Components/Native/MyImage/MyImage';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

type myProps = {
  quizID: string;
};

type RankItem = {
  user: User;
  score: Number;
  time: Number;
};

export default function QuizRank({quizID}: myProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const {navigate} = useNavigation();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizID]);

  function getData(refresh = false) {
    const url = `/quiz/ranklimit/${quizID}`;
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        // console.log('Data : ', data);
        setUsers(data);
      })
      .catch(() => {
        errorHandler('');
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function gotoProfile(user) {
    navigate('UserProfile', {
      user,
    });
  }

  function renderItem(item: RankItem, index) {
    return (
      <TouchableOpacity onPress={() => gotoProfile(item.user)}>
        <View style={styles.rankCont}>
          <View style={styles.dataCont}>
            <Text style={styles.name}>{index + 1}</Text>
            <MyImage style={styles.img} uri={item.user.photo} />
            <View>
              <Text style={styles.name}>{item.user.name}</Text>
              <Text style={styles.time}>
                {moment.duration(item.time).seconds() +
                  ' ' +
                  I18n.Timer.seconds}
                {' ' +
                  moment.duration(item.time).minutes() +
                  ' ' +
                  I18n.Timer.minutes}
              </Text>
            </View>
          </View>
          <View style={styles.pointsCont}>
            <Text style={styles.points}>{item.score}</Text>
            <Text style={styles.pointsLabel}>{I18n.Quiz.points}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderEmpty() {
    return (
      <View style={styles.emptyCont}>
        <Text style={styles.emptyMsg}>{I18n.EmptyMsg.noSubmissions}</Text>
      </View>
    );
  }

  if (loading) {
    return <Loading isVisible={true} />;
  } else {
    return (
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}>
        <FlatList
          data={users}
          style={styles.container}
          renderItem={({item, index}) => renderItem(item, index)}
          ListEmptyComponent={() => renderEmpty()}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={refreshing}
              onRefresh={() => {
                getData(true);
              }}
            />
          }
        />
      </ImageBackground>
    );
  }
}
