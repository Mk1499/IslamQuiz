import React, {useState} from 'react';
import {
  RefreshControl,
  View,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
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
import {SearchImg} from '../../../../../assets/images';
import UserCard from '../../../../Components/UserCard/UserCard.comp';
import {useNavigation} from '@react-navigation/native';

export default function GeneralSearch() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [query, setQuery] = useState<String>();
  const [searched, setSearched] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  function getData(refresh = false) {
    const url = `/search/general/${query}`;
    setLoading(true);
    setSearched(true);
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        // console.log('Data : ', data.users);
        setUsers(data.users);
      })
      .catch(() => {
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  return (
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
              <MyText style={styles.searchMsg}>{I18n.Search.welcomeMsg}</MyText>
            </>
          ) : null}

          {!loading && users.length ? (
            <View style={styles.section}>
              <MyText style={styles.sectionTitle}>{I18n.Search.users}</MyText>
              <FlatList
                data={users}
                renderItem={({item}) => <UserCard user={item} />}
                horizontal
                style={styles.list}
                inverted
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
