import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ImageBackground,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Loading from '../../../../Components/Loading/Loading';
import {useTheme} from '../../../../Theme/ThemeProvider';
import makeStyle from './GlobalRank.styles';
import {get} from '../../../../Services/api-service';
import {errorHandler} from '../../../../Services/toast-service';
import I18n from '../../../../translate';
import {useNavigation} from '@react-navigation/native';
import Submittion from '../../../../Models/Submittion.model';
import UserRow from '../../../../Components/LoeaderBoard/UserRow/UserRow';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

// type MyProps = {
//   user: User;
// };

function GlobalRank() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Submittion[]>([]);
  const {addListener} = useNavigation();

  //   const gotoQuizAnswers = useCallback(
  //     (submittion: Submittion) => {
  //       navigate('QuizAnswers', {
  //         submit: submittion.submit,
  //       });
  //     },
  //     [navigate],
  //   );

  useEffect(() => {
    const unSubscribe = addListener('focus', () => {
      getQuizzes();
    });

    return unSubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getQuizzes(refresh = false) {
    const url = '/user/listranktop';
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        // console.log('Rank : ', data);
        setUsers(data);
      })
      .catch(err => {
        console.log('Get Rank Err : ', err);
        errorHandler('');
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function renderEmpty() {
    return (
      <View style={styles.emptyCont}>
        <Text style={styles.emptyMsg}>{I18n.EmptyMsg.noTakenQuizzes}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          onRefresh={() => getQuizzes(true)}
          refreshing={refreshing}
          colors={[colors.primary]}
        />
      }>
      <ImageBackground
        source={require('../../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <View style={styles.msgCont}>
          <Text style={styles.msg}>{I18n.Leaderboard.wallOfHonor}</Text>
          {/* <Text style={styles.msg}>{I18n.Leaderboard.remaingTime}</Text> */}
          {/* <CountDown
            timeToShow={['D', 'H', 'M', 'S']}
            digitTxtStyle={styles.digitText}
            digitStyle={styles.digit}
            timeLabelStyle={styles.labelStyle}
            until={
              -1 *
              moment().diff(moment().add(1, 'months').startOf('month'), 's')
            }
            timeLabels={{
              m: I18n.Timer.minutes,
              s: I18n.Timer.seconds,
              d: I18n.Timer.days,
              h: I18n.Timer.hours,
            }}
            style={styles.timer}
          /> */}
        </View>
        {loading ? (
          <Loading isVisible={loading} />
        ) : (
          <FlatList
            data={users}
            renderItem={({item}) => (
              <UserRow user={item} />
              //   <TakenQuizCard item={item} action={() => gotoQuizAnswers(item)} />
            )}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(React.memo(GlobalRank));
