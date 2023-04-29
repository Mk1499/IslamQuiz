import React, {useState, useEffect, memo} from 'react';
import {FlatList, ImageBackground, View, Text} from 'react-native';
import QuizCard from '../../../../Components/QuizCard/QuizCard';
import Loading from '../../../../Components/Loading/Loading';

import makeStyle from './MyQuizzes.styles';
import {useTheme} from '../../../../Theme/ThemeProvider';
import {connect} from 'react-redux';
import User from '../../../../Models/User.model';
import {get} from '../../../../Services/api-service';
import {errorHandler} from '../../../../Services/toast-service';
import I18n from '../../../../translate';
import {useNavigation} from '@react-navigation/native';
import QuizType from '../../../../Models/Quiz.model';

type MyProps = {
  user: User;
};

function MyQuizzes({user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function gotoCreateQuiz() {
    navigate('CreateQuiz');
  }

  function gotoQuizIntro(quiz: QuizType) {
    navigate('QuizIntro', {
      quiz,
    });
  }

  function getData() {
    const url = `/user/createdQuizzes/${user._id}`;
    get(url, true)
      .then(({data}) => {
        setQuizzes(data);
      })
      .catch(() => {
        errorHandler('');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ImageBackground
      source={require('../../../../../assets/images/BGpattern.png')}
      style={styles.quizzesCont}>
      <FlatList
        data={quizzes}
        renderItem={({item}) => (
          <QuizCard
            item={item}
            action={() => gotoQuizIntro(item)}
            key={'quiz-' + item._id}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <View style={styles.msgCont}>
              <Text style={styles.emptyMsg}>
                {I18n.EmptyMsg.noCreatedQuizzes}
              </Text>
              <Text onPress={gotoCreateQuiz} style={styles.createOne}>
                {I18n.CreateQuiz.createNew}
              </Text>
            </View>
          )
        }
      />
      <Loading isVisible={loading} />
    </ImageBackground>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(MyQuizzes));
