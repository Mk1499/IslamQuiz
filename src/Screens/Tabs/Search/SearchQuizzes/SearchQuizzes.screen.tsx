import React, {useState, useEffect} from 'react';
import {ImageBackground, View, FlatList, RefreshControl} from 'react-native';
import {MyText} from '../../../../Components/Native';
import {useTheme} from '../../../../Theme/ThemeProvider';
import makeStyle from './SearchQuizzes.screen.styles';
import Header from '../../../../Components/Header/Header';
import I18n from '../../../../translate';
import {useRoute} from '@react-navigation/core';
import User from '../../../../Models/User.model';
import {get} from '../../../../Services/api-service';
import Loading from '../../../../Components/Loading/Loading';
import {errorHandler} from '../../../../Services/toast-service';
import QuizCard from '../../../../Components/QuizCard/QuizCard';
import {useNavigation} from '@react-navigation/native';

export default function SearchQuizzesScreen() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {params} = useRoute();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const {navigate} = useNavigation();

  useEffect(() => {
    getQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getQuizzes(refresh = false) {
    let url = `/search/quizzes/${params.query}`;
    setRefreshing(refresh);
    get(url)
      .then(({data}) => {
        setUsers(data);
      })
      .catch(() => {
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function gotoQuizIntro(quiz) {
    navigate('QuizIntro', {
      quiz,
    });
  }
  return (
    <ImageBackground
      source={require('../../../../../assets/images/BGpattern.png')}
      style={[styles.container]}>
      <Header />
      <View style={styles.content}>
        <MyText style={styles.title}>
          {I18n.Search.quizResults}
          <MyText style={styles.query}>{` ${params.query}`}</MyText>
        </MyText>
        {loading ? (
          <Loading isVisible={loading} />
        ) : (
          <FlatList
            data={users}
            renderItem={({item}) => (
              <QuizCard
                action={() => gotoQuizIntro(item)}
                key={`quiz-${item._id}`}
                item={item}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getQuizzes(true)}
                colors={[colors.primary]}
              />
            }
          />
        )}
      </View>
    </ImageBackground>
  );
}
