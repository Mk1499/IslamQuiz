import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './UserQuizzes.screen.styles';
import QuizType from '../../../Models/Quiz.model';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import TakenQuizCard from '../../../Components/TakenQuizCard/TakenQuizCard';
import Loading from '../../../Components/Loading/Loading';

export default function UserQuizzesScreen() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {params} = useRoute();
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const {goBack, navigate} = useNavigation();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getData() {
    let url = `/submit/list/${params.userID}`;
    get(url)
      .then(({data}) => {
        setQuizzes(data);
      })
      .catch(() => {
        errorHandler();
        goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function gotoQuizIntro(quiz) {
    navigate('QuizIntro', {
      quiz,
    });
  }

  return (
    <View style={styles.container}>
      <Header label={`${I18n.Profile.quizzes}  ${params.userName}`} />
      {loading ? (
        <View style={styles.loaderCont}>
          <Loading isVisible={loading} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listCont}
          data={quizzes}
          renderItem={({item}) => (
            <TakenQuizCard
              item={item}
              action={() => gotoQuizIntro(item.quiz)}
            />
          )}
        />
      )}
    </View>
  );
}
