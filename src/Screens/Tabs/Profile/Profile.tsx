import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  ImageBackground,
  RefreshControl,
  FlatList,
  View,
} from 'react-native';
import ProfileCard from '../../../Components/ProfileCard/ProfileCard';
import TabHeader from '../../../Components/TabHeader/TabHeader';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './Profile.styles';
import I18n from '../../../translate';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';
import {useNavigation} from '@react-navigation/native';
import {MyText} from '../../../Components/Native';
import {get} from '../../../Services/api-service';
import Loader from '../../../Components/Loading/Loading';

import TakenQuizCard from '../../../Components/TakenQuizCard/TakenQuizCard';
import Submittion from '../../../Models/Submittion.model';

type MyProps = {
  user: User;
  logoutAction: Function;
  navigation: {
    replace: Function;
    navigate: Function;
  };
  syncUserData: Function;
  syncingData: Boolean;
};

function Profile(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {user} = props;
  const {addListener, navigate} = useNavigation();
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [userData, setUserData] = useState<User>(user);
  const [takenQuizzes, setTakenQuizzes] = useState<Submittion[]>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getData(refresh = false) {
    const id = props.user?._id;
    const url = `/user/profile/${id}`;
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        console.log('DAA : ', data);
        setUserData(data.userData);
        setTakenQuizzes(data?.submittedQuizzes);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  // function navToScreen(screenName: String) {
  //   navigate(screenName);
  // }
  const gotoQuizAnswers = useCallback(
    (submittion: Submittion) => {
      navigate('QuizAnswers', {
        submitID: submittion._id,
      });
    },
    [navigate],
  );

  function renderEmpty() {
    return (
      <View style={styles.emptyCont}>
        <MyText style={styles.emptyMsg}>{I18n.EmptyMsg.noTakenQuizzes}</MyText>
      </View>
    );
  }

  useEffect(() => {
    const unSubscribe = addListener('focus', () => {
      props.syncUserData(props.user?._id);
    });

    return unSubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => getData(true)}
          colors={[colors.primary]}
        />
      }>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <TabHeader label={I18n.Screens.profile} />
        <ProfileCard
          name={userData?.name}
          points={userData?.points}
          email={userData?.email}
          photo={userData?.photo}
          rank={userData?.rank}
          submissions={userData?.submissions}
        />
        <View style={styles.dataContent}>
          <View style={styles.section}>
            <View style={styles.row}>
              <MyText style={styles.sectionTitle}>
                {I18n.Profile.myQuizzes}
              </MyText>
              {takenQuizzes.length > 5 ? (
                <MyText style={styles.more}>{I18n.Global.more}</MyText>
              ) : null}
            </View>
            {loading ? (
              <Loader isVisible={true} />
            ) : (
              <FlatList
                data={takenQuizzes}
                renderItem={({item}) => (
                  <TakenQuizCard
                    item={item}
                    action={() => gotoQuizAnswers(item)}
                  />
                )}
                ListEmptyComponent={renderEmpty}
                horizontal
                style={styles.list}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
  syncingData: state.auth.syncingUserData,
});

export default connect(mapStateToProps, {syncUserData})(memo(Profile));
