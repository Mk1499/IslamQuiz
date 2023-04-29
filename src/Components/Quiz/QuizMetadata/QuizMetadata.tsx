import React, {memo} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import QuizType from '../../../Models/Quiz.model';
import {useTheme} from '../../../Theme/ThemeProvider';
import I18n, {getActiveLang} from '../../../translate';
import makeStyle from './QuizMetadata.styles';
import CountDown from 'react-native-countdown-component';
import {MyButton} from '../../../Components/Native';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';

type MyProps = {
  quizData: QuizType;
  user: User;
};

function QuizMetadata({quizData, user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {navigate} = useNavigation();

  function getDuration() {
    return getActiveLang() === 'en'
      ? quizData?.duration?.enName
      : quizData?.duration?.arName;
  }

  function startQuiz() {
    navigate('QuizDetails', {
      quiz: quizData,
    });
  }

  function checkTakeable() {
    const endDate: Date = quizData.endDate;
    const startDate: Date = quizData.startDate;
    const isFuture = startDate ? moment().diff(startDate, 's') < 0 : false;
    const isExpired = endDate ? moment().diff(endDate, 's') > 0 : false;

    if (!quizData.noOfQuestions || quizData.user === user._id) {
      return false;
    } else if (isFuture) {
      // console.log('Diff : ', moment().diff(quizData.startDate, 's'));
      return (
        <CountDown
          timeToShow={['D', 'H', 'M', 'S']}
          digitTxtStyle={styles.digitText}
          digitStyle={styles.digit}
          timeLabelStyle={styles.labelStyle}
          until={-1 * moment().diff(quizData.startDate, 's')}
          timeLabels={{
            m: I18n.Timer.minutes,
            s: I18n.Timer.seconds,
            d: I18n.Timer.days,
            h: I18n.Timer.hours,
          }}
          style={styles.timer}
        />
      );
    } else if (isExpired) {
      return <Text style={styles.expireMsg}>{I18n.Quiz.isExpired}</Text>;
    } else {
      return <MyButton label={I18n.Quiz.start} action={startQuiz} />;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}>
        <View style={styles.metaDateCont}>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfQuestions} : </Text>
            <Text style={styles.value}>{quizData.noOfQuestions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfSubmissions} : </Text>
            <Text style={styles.value}>{quizData.submissions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.duration} : </Text>
            <Text style={styles.value}>{getDuration()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.points} : </Text>
            <Text style={styles.value}>{quizData.points}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.createdAt} : </Text>
            <Text style={styles.value}>
              {moment(quizData.createdAt).format('Do MMM YYYY - hh:mm a')}
            </Text>
          </View>
          {quizData.startDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.Quiz.startDate} : </Text>
              <Text style={styles.value}>
                {moment(quizData.startDate).format('Do MMM YYYY - hh:mm a')}
              </Text>
            </View>
          ) : null}
          {quizData.endDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.Quiz.endDate} : </Text>
              <Text style={styles.value}>
                {moment(quizData.endDate).format('Do MMM YYYY - hh:mm a')}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.actionCont}>{checkTakeable()}</View>
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(QuizMetadata));
