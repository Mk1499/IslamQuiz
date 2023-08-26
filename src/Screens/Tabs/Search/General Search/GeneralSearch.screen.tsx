import React, {useState} from 'react';
import {
  RefreshControl,
  View,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '../../../../Theme/ThemeProvider';
import makeStyle from './GeneralSearch.screen.styles';
import {MyText, MyInput} from '../../../../Components/Native';
import I18n from '../../../../translate';
import {Icon} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import Loader from '../../../../Components/Loading/Loading';
import User from '../../../../Models/User.model';
import QuizType from '../../../../Models/Quiz.model';
import Group from '../../../../Models/Group.model';
import {get} from '../../../../Services/api-service';
import {errorHandler} from '../../../../Services/toast-service';
import {SearchImg, NoResImg} from '../../../../../assets/images';
import UserCard from '../../../../Components/UserCard/UserCard.comp';
import {useNavigation} from '@react-navigation/native';
import screenNames from '../../../../Routes/Stacks/screenNames';
import QuizCard from '../../../../Components/QuizCard/QuizCard';
import {connect} from 'react-redux';

type MyProps = {
  user: User;
};

function GeneralSearch({user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [query, setQuery] = useState<String>();
  const [searched, setSearched] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const {navigate} = useNavigation();

  function getData(refresh = false) {
    const url = `/search/general/${query}`;
    setLoading(true);
    setSearched(true);
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        const filteredUsers = data.users.filter(u => u._id !== user._id);
        setUsers(filteredUsers || []);
        setQuizzes(data.quizzes || []);
        setGroups(data.groups || []);
      })
      .catch(() => {
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function noDataComp() {
    return (
      <View style={styles.noDataCont}>
        <MyText style={styles.noDataMsg}>{I18n.Search.noData}</MyText>
      </View>
    );
  }

  function showMoreUsers() {
    navigate(screenNames.searchUsers, {
      query,
    });
  }
  function showMoreQuizzes() {
    navigate(screenNames.searchQuizzes, {
      query,
    });
  }

  function gotoQuizIntro(quiz) {
    navigate('QuizIntro', {
      quiz,
    });
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.primary, flex: 1}}>
      <ImageBackground
        source={require('../../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getData(true)}
              colors={[colors.primary]}
            />
          }>
          <ImageBackground
            source={require('../../../../../assets/images/BGpattern.png')}
            style={styles.upperCont}>
            <View style={styles.searchCont}>
              <MyInput
                style={styles.searchInput}
                onChange={t => setQuery(t)}
                placeholder={I18n.Search.inputPlaceHolder}
                onSubmitEditing={() => {
                  if (query) {
                    getData();
                  }
                }}
              />
              <Icon style={styles.icon} name="search" as={Octicons} size="lg" />
            </View>
          </ImageBackground>

          <View style={styles.resultCont}>
            <Loader isVisible={loading} />

            {!loading && !searched ? (
              <>
                <Image
                  source={SearchImg}
                  resizeMode="contain"
                  style={styles.searchImg}
                />
                <MyText style={styles.searchMsg}>
                  {I18n.Search.welcomeMsg}
                </MyText>
              </>
            ) : null}
            {!loading &&
            searched &&
            !users.length &&
            !quizzes.length &&
            !groups.length ? (
              <>
                <Image
                  source={NoResImg}
                  resizeMode="contain"
                  style={styles.searchImg}
                />
                <MyText style={styles.searchMsg}>{I18n.Search.noData}</MyText>
              </>
            ) : null}
            {/* Users */}
            {!loading && users.length ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleCont}>
                  <MyText style={styles.sectionTitle}>
                    {I18n.Search.users}
                  </MyText>
                  <MyText style={styles.more} onPress={showMoreUsers}>
                    {I18n.Global.more}
                  </MyText>
                </View>
                <FlatList
                  data={users}
                  renderItem={({item}) => <UserCard user={item} />}
                  horizontal
                  contentContainerStyle={styles.usersList}
                  inverted
                  ListEmptyComponent={noDataComp}
                />
              </View>
            ) : null}
            {/* Quizzes */}
            {!loading && quizzes.length ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleCont}>
                  <MyText style={styles.sectionTitle}>
                    {I18n.Search.quizzes}
                  </MyText>
                  <MyText style={styles.more} onPress={showMoreQuizzes}>
                    {I18n.Global.more}
                  </MyText>
                </View>
                <FlatList
                  data={quizzes}
                  renderItem={({item}) => (
                    <View style={styles.quizCard}>
                      <QuizCard
                        action={() => gotoQuizIntro(item)}
                        key={`quiz-${item._id}`}
                        item={item}
                      />
                    </View>
                  )}
                  horizontal
                  contentContainerStyle={styles.list}
                  inverted
                  ListEmptyComponent={noDataComp}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(GeneralSearch);
