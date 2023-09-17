import React, {memo, useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  ImageBackground,
  RefreshControl,
  FlatList,
  View,
  Image,
} from 'react-native';
import ProfileCard from '../../../Components/ProfileCard/ProfileCard';
import TabHeader from '../../../Components/TabHeader/TabHeader';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './UserProfile.styles';
import I18n, {getActiveLang} from '../../../translate';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MyText} from '../../../Components/Native';
import {get} from '../../../Services/api-service';
import Loader from '../../../Components/Loading/Loading';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TakenQuizCard from '../../../Components/TakenQuizCard/TakenQuizCard';
import Submittion from '../../../Models/Submittion.model';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import screenNames from '../../../Routes/Stacks/screenNames';
import moment from 'moment';
import {LockImg} from '../../../../assets/images';
import Friendship from '../../../Models/Friendship.model';
import UserCard from '../../../Components/UserCard/UserCard.comp';

function Profile() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {params} = useRoute();
  const {user, userID} = params;
  const {addListener, navigate, goBack} = useNavigation();
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [userData, setUserData] = useState<User>(user);
  const [takenQuizzes, setTakenQuizzes] = useState<Submittion[]>([]);
  const [friendship, setFriendship] = useState<Friendship>(undefined);
  const [friends, setFriends] = useState<User[]>([]);

  const ref = useRef();

  useEffect(() => {
    // getData();
    const unSubscribe = addListener('focus', () => {
      getData();
    });

    return unSubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getData(refresh = false) {
    const id = userID || user?._id;
    const url = `/user/profile/${id}`;
    setRefreshing(refresh);
    if (userData?.submissions > 0 || userID) {
      get(url, true)
        .then(({data}) => {
          setUserData(data.userData);
          setTakenQuizzes(data?.submittedQuizzes);
          setFriends(data?.friends);
          setFriendship(data?.friendship);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    } else {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function shareProfile() {
    const message = `
    اختبر معلوماتك وتنافس معي عبر تطبيق متنافسون، هل أنت جاهز؟
    https://iquizz.netlify.app/mobile/profile-${userData._id}
    `;
    captureRef(ref, {
      format: 'jpg',
      quality: 0.8,
    })
      .then(url => {
        console.log('UR : ', url);
        Share.open({
          message,
          url,
        });
      })
      .catch(err => {
        console.log('err : ', err);
      });
  }

  function gotoQuizIntro(quiz) {
    navigate('QuizIntro', {
      quiz,
    });
  }

  // function renderEmpty() {
  //   return (
  //     <View style={styles.emptyCont}>
  //       <MyText style={styles.emptyMsg}>{I18n.EmptyMsg.noTakenQuizzes}</MyText>
  //     </View>
  //   );
  // }

  function showMoreQuizzes() {
    navigate(screenNames.userQuizzes, {
      userID: userData._id,
      userName: userData.name,
    });
  }

  function canShow() {
    let valid = true;
    if (userData.profileLocked) {
      if (friendship && friendship.status === 'valid') {
        valid === true;
      } else {
        valid = false;
      }
    }
    return valid;
  }

  function noDataComp() {
    return (
      <View style={styles.noDataCont}>
        <MyText style={styles.noDataMsg}>{I18n.Search.noData}</MyText>
      </View>
    );
  }

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
      <ViewShot
        ref={ref}
        captureMode="mount"
        options={{fileName: 'IQuiz-Score', format: 'jpg', quality: 0.9}}>
        <ImageBackground
          source={require('../../../../assets/images/BGpattern.png')}
          style={styles.content}>
          <TabHeader
            label={userData?.name}
            rightIcon={
              <Icon
                as={AntDesign}
                size="xl"
                style={styles.icon}
                name={getActiveLang() === 'ar' ? 'left' : 'right'}
                onPress={goBack}
              />
            }
            leftIcon={
              <Icon
                name="sharealt"
                as={AntDesign}
                size="xl"
                style={styles.icon}
                onPress={shareProfile}
              />
            }
          />
          {loading ? (
            <View style={styles.loaderCont}>
              <Loader isVisible />
            </View>
          ) : (
            <View>
              <ProfileCard
                name={userData?.name}
                points={userData?.points}
                email={userData?.email}
                photo={userData?.photo}
                rank={userData?.rank}
                submissions={userData?.submissions}
                quote={userData?.quote}
                isLocked={!canShow()}
                friendship={friendship}
                userData={userData}
              />
              {!canShow() ? (
                <View style={styles.lockedCont}>
                  <Image source={LockImg} style={styles.lockedImg} />
                  <MyText style={styles.lockedMsg}>
                    {I18n.Profile.profileLocked}
                  </MyText>
                </View>
              ) : (
                <View style={styles.dataContent}>
                  <View style={styles.section}>
                    {takenQuizzes.length ? (
                      <View style={styles.row}>
                        <MyText style={styles.sectionTitle}>
                          {I18n.Profile.myQuizzes}
                        </MyText>
                        {userData?.submissions > 5 ? (
                          <MyText style={styles.more} onPress={showMoreQuizzes}>
                            {I18n.Global.more}
                          </MyText>
                        ) : null}
                      </View>
                    ) : null}
                    {loading ? (
                      <Loader isVisible={true} />
                    ) : (
                      <>
                        <FlatList
                          data={takenQuizzes}
                          renderItem={({item}) => (
                            <View style={styles.cardCont}>
                              <TakenQuizCard
                                item={item}
                                action={() => gotoQuizIntro(item.quiz)}
                              />
                            </View>
                          )}
                          // ListEmptyComponent={renderEmpty}
                          horizontal
                          style={styles.list}
                        />

                        {/* friends */}
                        {!loading && friends.length ? (
                          <View style={styles.section}>
                            <View style={styles.sectionTitleCont}>
                              <MyText style={styles.sectionTitle}>
                                {I18n.Profile.friends}
                              </MyText>
                              <MyText
                                style={styles.more}
                                // onPress={showMoreUsers}
                              >
                                {I18n.Global.more}
                              </MyText>
                            </View>
                            <FlatList
                              data={friends}
                              renderItem={({item}) => <UserCard user={item} />}
                              horizontal
                              contentContainerStyle={styles.usersList}
                              inverted
                              ListEmptyComponent={noDataComp}
                            />
                          </View>
                        ) : null}
                      </>
                    )}
                    <MyText style={styles.competitorFrom}>
                      {I18n.Profile.competitorFrom}
                      <MyText style={styles.date}>
                        {' '}
                        {moment(userData?.createdAt).format('MMM YYYY')}
                      </MyText>
                    </MyText>
                  </View>
                </View>
              )}
            </View>
          )}
        </ImageBackground>
      </ViewShot>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
  syncingData: state.auth.syncingUserData,
});

export default connect(mapStateToProps, {syncUserData})(memo(Profile));
