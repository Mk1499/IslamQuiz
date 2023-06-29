import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
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
import makeStyle from './MyProfile.styles';
import I18n from '../../../translate';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';
import {useNavigation} from '@react-navigation/native';
import {MyText} from '../../../Components/Native';
import {get} from '../../../Services/api-service';
import Loader from '../../../Components/Loading/Loading';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TakenQuizCard from '../../../Components/TakenQuizCard/TakenQuizCard';
import Submittion from '../../../Models/Submittion.model';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';

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

function MyProfile(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {user} = props;
  const {addListener, navigate} = useNavigation();
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [userData, setUserData] = useState<User>(user);
  const [takenQuizzes, setTakenQuizzes] = useState<Submittion[]>([]);
  const ref = useRef();

  useEffect(() => {
    // getData();
    const unSubscribe = addListener('focus', () => {
      getData();
    });

    return unSubscribe;

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

  function navToScreen(screenName: String) {
    navigate(screenName);
  }
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
            label={I18n.Screens.profile}
            leftIcon={
              <Icon
                name="edit"
                as={AntDesign}
                size="xl"
                style={styles.icon}
                onPress={() => navToScreen('EditProfile')}
              />
            }
            rightIcon={
              <Icon
                name="sharealt"
                as={AntDesign}
                size="xl"
                style={styles.icon}
                onPress={shareProfile}
              />
            }
          />
          <ProfileCard
            name={userData?.name}
            points={userData?.points}
            email={userData?.email}
            photo={userData?.photo}
            rank={userData?.rank}
            submissions={userData?.submissions}
            quote={userData?.quote}
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
                    <View style={styles.cardCont}>
                      <TakenQuizCard
                        item={item}
                        action={() => gotoQuizAnswers(item)}
                      />
                    </View>
                  )}
                  ListEmptyComponent={renderEmpty}
                  horizontal
                  style={styles.list}
                />
              )}
            </View>
          </View>
        </ImageBackground>
      </ViewShot>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
  syncingData: state.auth.syncingUserData,
});

export default connect(mapStateToProps, {syncUserData})(memo(MyProfile));
