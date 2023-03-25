import React from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import makeStyle from './QuizIntro.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import I18n, {getActiveLang} from '../../../translate';
import QuizType from '../../../Models/Quiz.model';
import moment from 'moment';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import Share from 'react-native-share';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      quiz: QuizType;
    };
  };
};

export default function QuizIntro(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {quiz} = props.route.params;

  const goBack = () => {
    props.navigation.goBack();
  };

  const startQuiz = () => {
    props.navigation.navigate('QuizDetails', {
      quiz,
    });
  };

  const share = () => {
    const message = `please copy this code " ${quiz.code} " to join Quiz on Mutanafeson`;
    Share.open({
      message,
    });
  };

  function getDuration() {
    return getActiveLang() === 'en'
      ? quiz?.duration?.enName
      : quiz?.duration?.arName;
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.content}>
      <ScrollView style={styles.container}>
        <GradientCover
          onBack={goBack}
          coverURL={quiz.cover}
          title={quiz.name}
          description={quiz.description}
          onShare={share}
        />
        <View style={styles.metaDateCont}>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfQuestions} : </Text>
            <Text style={styles.value}>{quiz.noOfQuestions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfSubmissions} : </Text>
            <Text style={styles.value}>{quiz.submissions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.duration} : </Text>
            <Text style={styles.value}>{getDuration()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.points} : </Text>
            <Text style={styles.value}>{quiz.points}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.startDate} : </Text>
            <Text style={styles.value}>
              {moment(quiz.startDate).format('Do MMM YYYY - hh:mm a')}
            </Text>
          </View>
          {quiz.endData ? (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.Quiz.endDate} : </Text>
              <Text style={styles.value}>
                {moment(quiz.endData).format('Do MMM YYYY - hh:mm a')}
              </Text>
            </View>
          ) : null}
        </View>

        <View>
          {quiz.noOfQuestions ? (
            <MyButton label={I18n.Quiz.start} action={startQuiz} />
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
